import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipDirective } from './tooltip.directive';

@Component({
  standalone: true,
  imports: [TooltipDirective],
  template: `<button [emrTooltip]="'Hello'" [tooltipDisabled]="disabled">Hover me</button>`,
})
class HostComponent {
  disabled = false;
  @ViewChild(TooltipDirective) directive!: TooltipDirective;
}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let button: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    button = fixture.nativeElement.querySelector('button');
  });

  afterEach(() => {
    document.querySelectorAll('.tooltip-inner').forEach((el) => el.parentElement?.remove());
  });

  it('should render a tooltip with the given text on mouseenter', () => {
    button.dispatchEvent(new MouseEvent('mouseenter'));
    const tooltip = document.body.querySelector('.tooltip-inner');
    expect(tooltip?.textContent).toContain('Hello');
  });

  it('should remove the tooltip on mouseleave', () => {
    button.dispatchEvent(new MouseEvent('mouseenter'));
    button.dispatchEvent(new MouseEvent('mouseleave'));
    expect(document.body.querySelector('.tooltip-inner')).toBeFalsy();
  });

  it('should not render a tooltip when disabled', () => {
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    button.dispatchEvent(new MouseEvent('mouseenter'));
    expect(document.body.querySelector('.tooltip-inner')).toBeFalsy();
  });

  it('should not create a second tooltip while one is already shown', () => {
    button.dispatchEvent(new MouseEvent('mouseenter'));
    button.dispatchEvent(new MouseEvent('mouseenter'));
    expect(document.body.querySelectorAll('.tooltip-inner').length).toBe(1);
  });

  it('should show and hide on focusin/focusout as well', () => {
    button.dispatchEvent(new FocusEvent('focusin'));
    expect(document.body.querySelector('.tooltip-inner')).toBeTruthy();
    button.dispatchEvent(new FocusEvent('focusout'));
    expect(document.body.querySelector('.tooltip-inner')).toBeFalsy();
  });
});
