import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmrSortDirective } from './sort.directive';
import { EmrSortHeaderDirective } from './sort-header.directive';

@Component({
  standalone: true,
  imports: [EmrSortDirective, EmrSortHeaderDirective],
  template: `
    <table emrSort>
      <th emrSortHeader="name" #nameHeader="emrSortHeader">Name</th>
      <th emrSortHeader="date" #dateHeader="emrSortHeader">Date</th>
    </table>
  `,
})
class HostComponent {
  @ViewChild('nameHeader') nameHeader!: EmrSortHeaderDirective;
  @ViewChild('dateHeader') dateHeader!: EmrSortHeaderDirective;
  @ViewChild(EmrSortDirective) sort!: EmrSortDirective;
}

describe('EmrSortHeaderDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should sort by its field when clicked', () => {
    fixture.componentInstance.nameHeader.onClick();
    fixture.detectChanges();
    expect(fixture.componentInstance.sort.activeField()).toBe('name');
  });

  it('should report aria-sort as none when not the active column', () => {
    expect((fixture.componentInstance.dateHeader as any)._ariaSort()).toBe('none');
  });

  it('should report aria-sort ascending/descending once active', () => {
    fixture.componentInstance.nameHeader.onClick();
    fixture.detectChanges();
    expect((fixture.componentInstance.nameHeader as any)._ariaSort()).toBe('ascending');
    fixture.componentInstance.nameHeader.onClick();
    fixture.detectChanges();
    expect((fixture.componentInstance.nameHeader as any)._ariaSort()).toBe('descending');
  });

  it('should only report the clicked header as active', () => {
    fixture.componentInstance.nameHeader.onClick();
    fixture.detectChanges();
    expect((fixture.componentInstance.nameHeader as any)._isActive()).toBe(true);
    expect((fixture.componentInstance.dateHeader as any)._isActive()).toBe(false);
  });
});
