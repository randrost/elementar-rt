import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPanelNavComponent } from './tab-panel-nav.component';

describe('TabPanelNavComponent', () => {
  let fixture: ComponentFixture<TabPanelNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TabPanelNavComponent] }).compileComponents();
    fixture = TestBed.createComponent(TabPanelNavComponent);
    fixture.detectChanges();
  });

  it('should apply its host class and start its id counter at 0', () => {
    expect(fixture.nativeElement.classList.contains('emr-tab-panel-nav')).toBe(true);
    expect(fixture.componentInstance.nextId).toBe(0);
  });
});
