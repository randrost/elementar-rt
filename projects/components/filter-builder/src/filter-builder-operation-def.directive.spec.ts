import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBuilderOperationDefDirective } from './filter-builder-operation-def.directive';
import { FilterBuilderOperationNameDirective } from './filter-builder-operation-name.directive';

@Component({
  imports: [FilterBuilderOperationDefDirective, FilterBuilderOperationNameDirective],
  template: `
    <ng-container emrFilterBuilderOperationDef="contains" [allowedDataTypes]="['string']">
      <ng-template emrFilterBuilderOperationName>Contains</ng-template>
    </ng-container>
  `
})
class HostComponent {
  @ViewChild(FilterBuilderOperationDefDirective) def!: FilterBuilderOperationDefDirective;
}

describe('FilterBuilderOperationDefDirective', () => {
  it('should expose its id alias, allowed data types, and the content-projected operation name', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const def = fixture.componentInstance.def;
    expect(def.id()).toBe('contains');
    expect(def.allowedDataTypes()).toEqual(['string']);
    expect(def.operationName()).toBeTruthy();
  });
});
