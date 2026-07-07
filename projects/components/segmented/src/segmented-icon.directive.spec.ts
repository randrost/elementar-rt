import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentedIconDirective } from './segmented-icon.directive';

@Component({
  imports: [SegmentedIconDirective],
  template: `<span emrSegmentedIcon>icon</span>`
})
class HostComponent {}

describe('SegmentedIconDirective', () => {
  it('should apply its host class', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('span').classList.contains('emr-segmented-icon')).toBe(true);
  });
});
