import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsComponent } from './tabs.component';
import { TabComponent } from '../tab/tab.component';

@Component({
  standalone: true,
  imports: [TabsComponent, TabComponent],
  template: `
    <emr-tabs [(activeIndex)]="activeIndex">
      <emr-tab label="One">One content</emr-tab>
      <emr-tab label="Two" [disabled]="true">Two content</emr-tab>
      <emr-tab label="Three">Three content</emr-tab>
    </emr-tabs>
  `,
})
class HostComponent {
  activeIndex = 0;
  @ViewChild(TabsComponent) tabs!: TabsComponent;
}

describe('TabsComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let tabs: TabsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    tabs = fixture.componentInstance.tabs;
  });

  it('should select a tab and emit tabChange', () => {
    const emitted: number[] = [];
    tabs.tabChange.subscribe((i) => emitted.push(i));
    (tabs as any)._select(2);
    expect(tabs.activeIndex()).toBe(2);
    expect(emitted).toEqual([2]);
  });

  it('should ignore selecting a disabled tab', () => {
    (tabs as any)._select(1);
    expect(tabs.activeIndex()).toBe(0);
  });

  it('should register all projected tabs', () => {
    expect((tabs as any)._tabs().length).toBe(3);
  });
});
