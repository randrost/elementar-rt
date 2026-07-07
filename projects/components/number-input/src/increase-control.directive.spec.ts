import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreaseControlDirective } from './increase-control.directive';

@Component({
  imports: [IncreaseControlDirective],
  template: `<ng-template emrIncreaseControl>content</ng-template>`
})
class HostComponent {
  @ViewChild(IncreaseControlDirective) directive!: IncreaseControlDirective;
}

describe('IncreaseControlDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should expose the injected templateRef', () => {
    expect(fixture.componentInstance.directive.templateRef).toBeInstanceOf(TemplateRef);
  });
});
