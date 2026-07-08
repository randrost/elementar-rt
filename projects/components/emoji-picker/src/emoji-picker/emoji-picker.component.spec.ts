import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiPickerComponent } from './emoji-picker.component';
import { EMOJI_PICKER_TRIGGER_FOR } from '../types';

// The component's dynamic import() of emojibase-data data files is a real
// browser module load, not tracked by zone.js as a pending macrotask, so
// fixture.whenStable() resolves before it finishes; poll for the signal instead.
async function waitUntilLoaded(fixture: ComponentFixture<EmojiPickerComponent>, component: EmojiPickerComponent) {
  for (let i = 0; i < 100 && !(component as any).loaded(); i++) {
    await new Promise(resolve => setTimeout(resolve, 50));
    fixture.detectChanges();
  }
}

describe('EmojiPickerComponent', () => {
  let fixture: ComponentFixture<EmojiPickerComponent>;
  let component: EmojiPickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EmojiPickerComponent] }).compileComponents();
    fixture = TestBed.createComponent(EmojiPickerComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('language', 'en');
    fixture.detectChanges();
  });

  it('should load emoji groups asynchronously and mark itself loaded', async () => {
    // Loaded language data is cached at module scope, and Jasmine runs specs
    // in random order, so whether `loaded()` starts false depends on whether
    // some other spec already warmed the 'en' cache; only assert the
    // eventually-consistent end state here.
    await waitUntilLoaded(fixture, component);

    expect((component as any).loaded()).toBe(true);
    expect((component as any).groups().length).toBeGreaterThan(0);
    expect((component as any).groups()[0].emoji.length).toBeGreaterThan(0);
  }, 15000);

  it('should render emoji buttons once loaded', async () => {
    await waitUntilLoaded(fixture, component);

    const buttons = fixture.nativeElement.querySelectorAll('button.button');
    expect(buttons.length).toBeGreaterThan(0);
  }, 15000);

  it('should track the hovered emoji and clear it on mouse leave', () => {
    const emoji = { emoji: '😀', label: 'grinning face' };
    component.hoverEmoji(emoji);
    expect((component as any)._hoveredEmoji()).toBe(emoji);

    component.onMouseLeave();
    expect((component as any)._hoveredEmoji()).toBeNull();
  });

  it('should emit the emoji character on select', () => {
    const emitted: string[] = [];
    component.emojiSelected.subscribe(e => emitted.push(e));

    component.select({ emoji: '🎉' });

    expect(emitted).toEqual(['🎉']);
  });
});

describe('EmojiPickerComponent (with trigger)', () => {
  it('should close the trigger via its api after selecting an emoji', () => {
    const closeSpy = jasmine.createSpy('close');

    @Component({
      imports: [EmojiPickerComponent],
      template: '<emr-emoji-picker />',
      providers: [{ provide: EMOJI_PICKER_TRIGGER_FOR, useValue: { api: { close: closeSpy } } }]
    })
    class HostComponent {}

    const fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(HostComponent);
    fixture.detectChanges();
    const picker = fixture.debugElement.children[0].componentInstance as EmojiPickerComponent;

    picker.select({ emoji: '👍' });

    expect(closeSpy).toHaveBeenCalled();
  });
});
