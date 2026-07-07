import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbItemIconDefDirective } from './breadcrumb-item-icon-def.directive';

@Component({
  standalone: true,
  imports: [BreadcrumbItemIconDefDirective],
  template: `<ng-template emrBreadcrumbItemIconDef></ng-template>`,
})
class HostComponent {
  @ViewChild(BreadcrumbItemIconDefDirective) directive!: BreadcrumbItemIconDefDirective;
}

describe('BreadcrumbItemIconDefDirective', () => {
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
