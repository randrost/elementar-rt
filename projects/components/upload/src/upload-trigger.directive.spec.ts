import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadTriggerDirective } from './upload-trigger.directive';

@Component({
  standalone: true,
  imports: [UploadTriggerDirective],
  template: `<button emrUploadTrigger></button>`,
})
class HostComponent {
  @ViewChild(UploadTriggerDirective) directive!: UploadTriggerDirective;
}

describe('UploadTriggerDirective', () => {
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
