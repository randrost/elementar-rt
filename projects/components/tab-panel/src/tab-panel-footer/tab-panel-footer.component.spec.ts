import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPanelFooterComponent } from './tab-panel-footer.component';

describe('TabPanelFooterComponent', () => {
  let fixture: ComponentFixture<TabPanelFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TabPanelFooterComponent] }).compileComponents();
    fixture = TestBed.createComponent(TabPanelFooterComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-tab-panel-footer')).toBe(true);
  });
});
