import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationItemIconDirective } from './navigation-item-icon.directive';

@Component({
  imports: [NavigationItemIconDirective],
  template: `<ng-template emrNavigationItemIcon>icon</ng-template>`
})
class HostComponent {
  @ViewChild(NavigationItemIconDirective) directive!: NavigationItemIconDirective;
}

describe('NavigationItemIconDirective', () => {
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
