import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbItemTitleDefDirective } from './breadcrumb-item-title-def.directive';

@Component({
  standalone: true,
  imports: [BreadcrumbItemTitleDefDirective],
  template: `<ng-template emrBreadcrumbItemTitleDef></ng-template>`,
})
class HostComponent {
  @ViewChild(BreadcrumbItemTitleDefDirective) directive!: BreadcrumbItemTitleDefDirective;
}

describe('BreadcrumbItemTitleDefDirective', () => {
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
