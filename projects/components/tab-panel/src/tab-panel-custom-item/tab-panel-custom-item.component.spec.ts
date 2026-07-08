import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPanelComponent } from '../tab-panel/tab-panel.component';
import { TabPanelCustomItemComponent } from './tab-panel-custom-item.component';

@Component({
  standalone: true,
  imports: [TabPanelComponent, TabPanelCustomItemComponent],
  template: `
    <emr-tab-panel>
      <emr-tab-panel-custom-item [for]="'custom-1'">Custom</emr-tab-panel-custom-item>
    </emr-tab-panel>
  `,
})
class HostComponent {
  @ViewChild(TabPanelCustomItemComponent) item!: TabPanelCustomItemComponent;
}

describe('TabPanelCustomItemComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should activate the configured id in the shared api when clicked', () => {
    const item = fixture.componentInstance.item;
    (item as any)._handleClick();
    expect(item.api.isActive('custom-1')).toBe(true);
  });

  it('should do nothing when clicked without a "for" id', () => {
    const item = fixture.componentInstance.item;
    (item as any).for = () => undefined;
    (item as any)._handleClick();
    expect(item.api.hasActive()).toBe(false);
  });
});
