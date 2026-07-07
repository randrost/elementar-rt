import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPanelHeaderComponent } from './tab-panel-header.component';

describe('TabPanelHeaderComponent', () => {
  let fixture: ComponentFixture<TabPanelHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TabPanelHeaderComponent] }).compileComponents();
    fixture = TestBed.createComponent(TabPanelHeaderComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-tab-panel-header')).toBe(true);
  });
});
