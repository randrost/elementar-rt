import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPanelItemIconDirective } from './tab-panel-item-icon.directive';

@Component({
  imports: [TabPanelItemIconDirective],
  template: `<span emrTabPanelItemIcon>icon</span>`
})
class HostComponent {}

describe('TabPanelItemIconDirective', () => {
  it('should apply its host class', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture: ComponentFixture<HostComponent> = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('span').classList.contains('emr-tab-panel-item-icon')).toBe(true);
  });
});
