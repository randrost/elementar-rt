import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataViewEmptyFilterResultsDirective } from './data-view-empty-filter-results.directive';

@Component({
  standalone: true,
  imports: [DataViewEmptyFilterResultsDirective],
  template: `<ng-template emrDataViewEmptyFilterResults></ng-template>`,
})
class HostComponent {
  @ViewChild(DataViewEmptyFilterResultsDirective) directive!: DataViewEmptyFilterResultsDirective;
}

describe('DataViewEmptyFilterResultsDirective', () => {
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
