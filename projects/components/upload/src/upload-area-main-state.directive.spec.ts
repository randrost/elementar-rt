import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadAreaMainStateDirective } from './upload-area-main-state.directive';

@Component({
  standalone: true,
  imports: [UploadAreaMainStateDirective],
  template: `<ng-template emrUploadAreaMainState></ng-template>`,
})
class HostComponent {
  @ViewChild(UploadAreaMainStateDirective) directive!: UploadAreaMainStateDirective;
}

describe('UploadAreaMainStateDirective', () => {
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
