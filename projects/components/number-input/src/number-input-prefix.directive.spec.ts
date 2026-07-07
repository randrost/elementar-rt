import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberInputPrefixDirective } from './number-input-prefix.directive';

@Component({
  imports: [NumberInputPrefixDirective],
  template: `<ng-template emrNumberInputPrefix>content</ng-template>`
})
class HostComponent {
  @ViewChild(NumberInputPrefixDirective) directive!: NumberInputPrefixDirective;
}

describe('NumberInputPrefixDirective', () => {
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
