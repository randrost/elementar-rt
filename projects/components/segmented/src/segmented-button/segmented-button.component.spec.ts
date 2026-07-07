import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SegmentedComponent } from '../segmented/segmented.component';
import { SegmentedButtonComponent } from './segmented-button.component';

@Component({
  imports: [SegmentedComponent, SegmentedButtonComponent, FormsModule],
  template: `
    <emr-segmented [(ngModel)]="value">
      <emr-segmented-button [value]="'a'" [iconOnly]="true">A</emr-segmented-button>
      <emr-segmented-button [value]="'b'" [disabled]="true">B</emr-segmented-button>
    </emr-segmented>
  `
})
class HostComponent {
  value: any = 'a';
}

describe('SegmentedButtonComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should report itself selected via the api when it matches the segmented value', () => {
    const buttons = fixture.debugElement.children[0].children;
    const buttonA = buttons[0].componentInstance as SegmentedButtonComponent;
    const buttonB = buttons[1].componentInstance as SegmentedButtonComponent;

    expect(buttonA.api.isSelected()).toBe(true);
    expect(buttonB.api.isSelected()).toBe(false);
  });

  it('should reflect the iconOnly input as a host class', () => {
    const buttons = fixture.nativeElement.querySelectorAll('emr-segmented-button');
    expect(buttons[0].classList.contains('icon-only')).toBe(true);
    expect(buttons[1].classList.contains('icon-only')).toBe(false);
  });

  it('should not select itself when clicked while disabled', () => {
    const buttons = fixture.nativeElement.querySelectorAll('emr-segmented-button');
    buttons[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.value).toBe('a');
    expect(buttons[1].classList.contains('is-selected')).toBe(false);
  });
});
