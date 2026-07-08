import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecreaseControlDirective } from './decrease-control.directive';

@Component({
  imports: [DecreaseControlDirective],
  template: `<ng-template emrDecreaseControl>content</ng-template>`
})
class HostComponent {
  @ViewChild(DecreaseControlDirective) directive!: DecreaseControlDirective;
}

describe('DecreaseControlDirective', () => {
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
