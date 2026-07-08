import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBuilderOperationIconDirective } from './filter-builder-operation-icon.directive';

@Component({
  imports: [FilterBuilderOperationIconDirective],
  template: `<ng-template emrFilterBuilderOperationIcon>content</ng-template>`
})
class HostComponent {
  @ViewChild(FilterBuilderOperationIconDirective) directive!: FilterBuilderOperationIconDirective;
}

describe('FilterBuilderOperationIconDirective', () => {
  it('should expose the injected templateRef', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.directive.templateRef).toBeInstanceOf(TemplateRef);
  });
});
