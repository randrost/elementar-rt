import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataViewEmptyDataDirective } from './data-view-empty-data.directive';

@Component({
  standalone: true,
  imports: [DataViewEmptyDataDirective],
  template: `<ng-template emrDataViewEmptyData></ng-template>`,
})
class HostComponent {
  @ViewChild(DataViewEmptyDataDirective) directive!: DataViewEmptyDataDirective;
}

describe('DataViewEmptyDataDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance.directive).toBeTruthy();
  });
});
