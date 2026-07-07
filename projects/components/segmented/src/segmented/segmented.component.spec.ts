import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SegmentedComponent } from './segmented.component';
import { SegmentedButtonComponent } from '../segmented-button/segmented-button.component';

@Component({
  imports: [SegmentedComponent, SegmentedButtonComponent, FormsModule],
  template: `
    <emr-segmented [(ngModel)]="value" [size]="size">
      <emr-segmented-button [value]="'a'">A</emr-segmented-button>
      <emr-segmented-button [value]="'b'">B</emr-segmented-button>
    </emr-segmented>
  `
})
class HostComponent {
  value: any = null;
  size = 'default';
}

describe('SegmentedComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should select a button on click and update the bound ngModel', () => {
    const buttons = fixture.nativeElement.querySelectorAll('emr-segmented-button');
    buttons[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance.value).toBe('b');
    expect(buttons[1].classList.contains('is-selected')).toBe(true);
    expect(buttons[0].classList.contains('is-selected')).toBe(false);
  });

  it('should expose the size input as a host attribute', () => {
    expect(fixture.nativeElement.querySelector('emr-segmented').getAttribute('emr-segmented-size')).toBe('default');

    fixture.componentInstance.size = 'lg';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('emr-segmented').getAttribute('emr-segmented-size')).toBe('lg');
  });

  it('should mark the disabled state via setDisabledState', () => {
    const segmentedInstance = fixture.debugElement.children[0].componentInstance as SegmentedComponent;

    segmentedInstance.setDisabledState(true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('emr-segmented').classList.contains('is-disabled')).toBe(true);
  });
});
