import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBuilderOperationNameDirective } from './filter-builder-operation-name.directive';

@Component({
  imports: [FilterBuilderOperationNameDirective],
  template: `<ng-template emrFilterBuilderOperationName>content</ng-template>`
})
class HostComponent {
  @ViewChild(FilterBuilderOperationNameDirective) directive!: FilterBuilderOperationNameDirective;
}

describe('FilterBuilderOperationNameDirective', () => {
  it('should expose the injected templateRef', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.directive.templateRef).toBeInstanceOf(TemplateRef);
  });
});
