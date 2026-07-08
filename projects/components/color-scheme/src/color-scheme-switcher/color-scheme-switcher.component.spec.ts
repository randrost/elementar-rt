import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSchemeStore } from '../color-scheme.store';
import { ColorSchemeSwitcherComponent } from './color-scheme-switcher.component';
import { ColorSchemeLightDirective } from '../color-scheme-light.directive';
import { ColorSchemeDarkDirective } from '../color-scheme-dark.directive';

@Component({
  standalone: true,
  imports: [ColorSchemeSwitcherComponent, ColorSchemeLightDirective, ColorSchemeDarkDirective],
  template: `
    <emr-color-scheme-switcher>
      <ng-template emrColorSchemeLight>light</ng-template>
      <ng-template emrColorSchemeDark>dark</ng-template>
    </emr-color-scheme-switcher>
  `,
})
class HostComponent {
  @ViewChild(ColorSchemeSwitcherComponent) switcher!: ColorSchemeSwitcherComponent;
}

describe('ColorSchemeSwitcherComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [ColorSchemeStore],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance.switcher).toBeTruthy();
  });
});
