import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardComponent } from './keyboard.component';

describe('KeyboardComponent', () => {
  let fixture: ComponentFixture<KeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [KeyboardComponent] }).compileComponents();
    fixture = TestBed.createComponent(KeyboardComponent);
  });

  it('should render mac symbols when platform is forced to mac', () => {
    fixture.componentRef.setInput('keys', ['ctrl', 'shift', 'enter']);
    fixture.componentRef.setInput('platform', 'mac');
    fixture.detectChanges();

    const keys = Array.from(fixture.nativeElement.querySelectorAll('.kbd-key')).map((el: any) => el.textContent.trim());
    expect(keys).toEqual(['⌘', '⇧', '↵']);
  });

  it('should render windows-style labels when platform is forced to win', () => {
    fixture.componentRef.setInput('keys', ['ctrl', 'shift', 'enter']);
    fixture.componentRef.setInput('platform', 'win');
    fixture.detectChanges();

    const keys = Array.from(fixture.nativeElement.querySelectorAll('.kbd-key')).map((el: any) => el.textContent.trim());
    expect(keys).toEqual(['Ctrl', 'Shift', 'Enter']);
  });

  it('should uppercase unknown keys as a fallback', () => {
    fixture.componentRef.setInput('keys', ['k']);
    fixture.componentRef.setInput('platform', 'win');
    fixture.detectChanges();

    const keys = Array.from(fixture.nativeElement.querySelectorAll('.kbd-key')).map((el: any) => el.textContent.trim());
    expect(keys).toEqual(['K']);
  });

  it('should render a separator between each key but not after the last', () => {
    fixture.componentRef.setInput('keys', ['ctrl', 'k']);
    fixture.componentRef.setInput('platform', 'win');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.kbd-sep').length).toBe(1);
  });
});
