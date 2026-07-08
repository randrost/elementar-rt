import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberInputSuffixDirective } from './number-input-suffix.directive';

@Component({
  imports: [NumberInputSuffixDirective],
  template: `<ng-template emrNumberInputSuffix>content</ng-template>`
})
class HostComponent {
  @ViewChild(NumberInputSuffixDirective) directive!: NumberInputSuffixDirective;
}

describe('NumberInputSuffixDirective', () => {
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
