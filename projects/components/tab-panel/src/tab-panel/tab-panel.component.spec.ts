import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPanelComponent } from './tab-panel.component';

describe('TabPanelComponent', () => {
  let fixture: ComponentFixture<TabPanelComponent>;
  let component: TabPanelComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TabPanelComponent] }).compileComponents();
    fixture = TestBed.createComponent(TabPanelComponent);
    component = fixture.componentInstance;
  });

  it('should activate the initial activeItemId without emitting itemIdChanged', () => {
    const emitted: void[] = [];
    component.itemIdChanged.subscribe(() => emitted.push(undefined));
    fixture.componentRef.setInput('activeItemId', 'tab-1');
    fixture.detectChanges();
    expect(component.api.isActive('tab-1')).toBe(true);
    expect(emitted.length).toBe(0);
  });

  it('should re-activate when activeItemId changes', () => {
    fixture.componentRef.setInput('activeItemId', 'tab-1');
    fixture.detectChanges();
    fixture.componentRef.setInput('activeItemId', 'tab-2');
    fixture.detectChanges();
    expect(component.api.isActive('tab-2')).toBe(true);
    expect(component.api.isActive('tab-1')).toBe(false);
  });

  it('should emit itemIdChanged when an item activates itself through the shared api', () => {
    fixture.detectChanges();
    const emitted: void[] = [];
    component.itemIdChanged.subscribe(() => emitted.push(undefined));
    component.api.activate('tab-3');
    expect(emitted.length).toBe(1);
  });
});
