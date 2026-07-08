import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAreaInvalidStateDirective } from './upload-area-invalid-state.directive';

@Component({
  imports: [UploadAreaInvalidStateDirective],
  template: `<ng-template emrUploadAreaInvalidState>invalid</ng-template>`
})
class HostComponent {
  @ViewChild(UploadAreaInvalidStateDirective) directive!: UploadAreaInvalidStateDirective;
}

describe('UploadAreaInvalidStateDirective', () => {
  it('should expose the injected templateRef', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.directive.templateRef).toBeInstanceOf(TemplateRef);
  });
});
