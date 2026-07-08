import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSchemeLightDirective } from './color-scheme-light.directive';

@Component({
  imports: [ColorSchemeLightDirective],
  template: `<ng-template emrColorSchemeLight>content</ng-template>`
})
class HostComponent {
  @ViewChild(ColorSchemeLightDirective) directive!: ColorSchemeLightDirective;
}

describe('ColorSchemeLightDirective', () => {
  it('should expose the injected templateRef', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.directive.templateRef).toBeInstanceOf(TemplateRef);
  });
});
