import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbItemNameDefDirective } from './breadcrumb-item-name-def.directive';

@Component({
  standalone: true,
  imports: [BreadcrumbItemNameDefDirective],
  template: `<ng-template emrBreadcrumbItemNameDef></ng-template>`,
})
class HostComponent {
  @ViewChild(BreadcrumbItemNameDefDirective) directive!: BreadcrumbItemNameDefDirective;
}

describe('BreadcrumbItemNameDefDirective', () => {
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
