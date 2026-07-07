import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationGroupToggleIconDirective } from './navigation-group-toggle-icon.directive';

@Component({
  imports: [NavigationGroupToggleIconDirective],
  template: `<ng-template emrNavigationGroupToggleIcon>icon</ng-template>`
})
class HostComponent {
  @ViewChild(NavigationGroupToggleIconDirective) directive!: NavigationGroupToggleIconDirective;
}

describe('NavigationGroupToggleIconDirective', () => {
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
