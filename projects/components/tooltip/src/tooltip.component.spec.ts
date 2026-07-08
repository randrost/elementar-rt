import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipComponent } from './tooltip.component';

describe('TooltipComponent', () => {
  let fixture: ComponentFixture<TooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TooltipComponent] }).compileComponents();
    fixture = TestBed.createComponent(TooltipComponent);
  });

  it('should render the plain text when no template is provided', () => {
    fixture.componentRef.setInput('text', 'Hello there');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.tooltip-inner').textContent.trim()).toBe('Hello there');
  });

  it('should default the placement attribute to top', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.tooltip-inner').getAttribute('data-placement')).toBe('top');
  });

  it('should reflect a custom placement', () => {
    fixture.componentRef.setInput('placement', 'bottom');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.tooltip-inner').getAttribute('data-placement')).toBe('bottom');
  });
});

@Component({
  imports: [TooltipComponent],
  template: `
    <ng-template #tpl>custom content</ng-template>
    <emr-tooltip-content [templateRef]="tpl" text="ignored" />
  `
})
class HostComponent {
  @ViewChild(TemplateRef) tpl!: TemplateRef<any>;
}

describe('TooltipComponent (with template)', () => {
  it('should render the projected template instead of the text input when provided', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.tooltip-inner').textContent.trim()).toBe('custom content');
  });
});
