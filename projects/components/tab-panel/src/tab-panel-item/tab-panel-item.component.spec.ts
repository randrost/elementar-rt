import { Component, ViewChildren, QueryList } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TabPanelComponent } from '../tab-panel/tab-panel.component';
import { TabPanelHeaderComponent } from '../tab-panel-header/tab-panel-header.component';
import { TabPanelNavComponent } from '../tab-panel-nav/tab-panel-nav.component';
import { TabPanelItemComponent } from './tab-panel-item.component';

@Component({
  standalone: true,
  imports: [TabPanelComponent, TabPanelHeaderComponent, TabPanelNavComponent, TabPanelItemComponent],
  // TabPanelComponent only projects content into its header/body/footer/aside
  // slots, so the nav must be wrapped in emr-tab-panel-header to actually render.
  template: `
    <emr-tab-panel>
      <emr-tab-panel-header>
        <emr-tab-panel-nav>
          <emr-tab-panel-item>First</emr-tab-panel-item>
          <emr-tab-panel-item>Second</emr-tab-panel-item>
          <emr-tab-panel-item [for]="'explicit'">Third</emr-tab-panel-item>
        </emr-tab-panel-nav>
      </emr-tab-panel-header>
    </emr-tab-panel>
  `,
})
class HostComponent {
  @ViewChildren(TabPanelItemComponent) items!: QueryList<TabPanelItemComponent>;
}

describe('TabPanelItemComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should auto-assign incrementing ids from the parent nav when "for" is not set', () => {
    const items = fixture.componentInstance.items.toArray();
    expect(items[0].for()).toBe(0);
    expect(items[1].for()).toBe(1);
  });

  it('should use an explicit "for" id when provided', () => {
    const items = fixture.componentInstance.items.toArray();
    expect(items[2].for()).toBe('explicit');
  });

  it('should activate itself through the shared api when clicked', () => {
    const items = fixture.componentInstance.items.toArray();
    (items[1] as any)._handleClick();
    expect(items[1].api.isActive(1)).toBe(true);
    expect(items[0].api.isActive(0)).toBe(false);
  });

  it('should reflect the active state via the is-active host class', () => {
    const items = fixture.componentInstance.items.toArray();
    items[0].api.activate(0);
    fixture.detectChanges();
    const itemEls = fixture.debugElement.queryAll(By.directive(TabPanelItemComponent));
    expect(itemEls[0].nativeElement.classList.contains('is-active')).toBe(true);
    expect(itemEls[1].nativeElement.classList.contains('is-active')).toBe(false);
  });
});
