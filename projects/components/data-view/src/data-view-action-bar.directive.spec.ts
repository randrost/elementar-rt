import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataViewActionBarDirective } from './data-view-action-bar.directive';

@Component({
  standalone: true,
  imports: [DataViewActionBarDirective],
  template: `<ng-template emrDataViewActionBar></ng-template>`,
})
class HostComponent {
  @ViewChild(DataViewActionBarDirective) directive!: DataViewActionBarDirective;
}

describe('DataViewActionBarDirective', () => {
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
