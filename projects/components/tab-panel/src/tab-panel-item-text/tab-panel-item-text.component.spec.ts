import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPanelItemTextComponent } from './tab-panel-item-text.component';

describe('TabPanelItemTextComponent', () => {
  let fixture: ComponentFixture<TabPanelItemTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TabPanelItemTextComponent] }).compileComponents();
    fixture = TestBed.createComponent(TabPanelItemTextComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-tab-panel-item-text')).toBe(true);
  });
});
