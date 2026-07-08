import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSchemeDarkDirective } from './color-scheme-dark.directive';

@Component({
  imports: [ColorSchemeDarkDirective],
  template: `<ng-template emrColorSchemeDark>content</ng-template>`
})
class HostComponent {
  @ViewChild(ColorSchemeDarkDirective) directive!: ColorSchemeDarkDirective;
}

describe('ColorSchemeDarkDirective', () => {
  it('should expose the injected templateRef', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.directive.templateRef).toBeInstanceOf(TemplateRef);
  });
});
