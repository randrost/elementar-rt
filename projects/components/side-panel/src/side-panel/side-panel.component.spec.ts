import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelComponent } from './side-panel.component';
import { SidePanelTabComponent } from '../side-panel-tab/side-panel-tab.component';

@Component({
  standalone: true,
  imports: [SidePanelComponent, SidePanelTabComponent],
  template: `
    <emr-side-panel>
      <emr-side-panel-tab tabId="details" label="Details">
        <ng-template #contentTemplate>Details content</ng-template>
      </emr-side-panel-tab>
      <emr-side-panel-tab tabId="history" label="History">
        <ng-template #contentTemplate>History content</ng-template>
      </emr-side-panel-tab>
    </emr-side-panel>
  `,
})
class HostComponent {
  @ViewChild(SidePanelComponent) panel!: SidePanelComponent;
}

describe('SidePanelComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let panel: SidePanelComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    panel = fixture.componentInstance.panel;
  });

  it('should register the projected tabs', () => {
    expect((panel as any).internalTabs().map((t: any) => t.tabId)).toEqual(['details', 'history']);
  });

  it('should open a tab and emit opened', () => {
    const emitted: void[] = [];
    panel.opened.subscribe(() => emitted.push(undefined));
    panel.toggleTab('details');
    expect(panel.isOpen()).toBe(true);
    expect(panel.activeTabId()).toBe('details');
    expect(emitted.length).toBe(1);
  });

  it('should switch tabs without closing when a different tab is toggled', () => {
    panel.toggleTab('details');
    panel.toggleTab('history');
    expect(panel.isOpen()).toBe(true);
    expect(panel.activeTabId()).toBe('history');
  });

  it('should close when the active tab is toggled again', () => {
    panel.toggleTab('details');
    const emitted: void[] = [];
    panel.closed.subscribe(() => emitted.push(undefined));
    panel.toggleTab('details');
    expect(panel.isOpen()).toBe(false);
    expect(emitted.length).toBe(1);
  });

  it('should return the active tab content template only while open', () => {
    expect(panel.selectedTabContent()).toBeNull();
    panel.toggleTab('details');
    expect(panel.selectedTabContent()).toBeTruthy();
  });

  it('should explicitly close via close()', () => {
    panel.toggleTab('details');
    panel.close();
    expect(panel.isOpen()).toBe(false);
  });
});
