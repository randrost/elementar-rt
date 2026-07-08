import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadAreaDropStateDirective } from './upload-area-drop-state.directive';

@Component({
  standalone: true,
  imports: [UploadAreaDropStateDirective],
  template: `<ng-template emrUploadAreaDropState></ng-template>`,
})
class HostComponent {
  @ViewChild(UploadAreaDropStateDirective) directive!: UploadAreaDropStateDirective;
}

describe('UploadAreaDropStateDirective', () => {
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
