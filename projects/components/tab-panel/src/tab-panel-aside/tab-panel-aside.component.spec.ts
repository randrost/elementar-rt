import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPanelAsideComponent } from './tab-panel-aside.component';

describe('TabPanelAsideComponent', () => {
  let fixture: ComponentFixture<TabPanelAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TabPanelAsideComponent] }).compileComponents();
    fixture = TestBed.createComponent(TabPanelAsideComponent);
    fixture.detectChanges();
  });

  it('should apply its host class and start its id counter at 0', () => {
    expect(fixture.nativeElement.classList.contains('emr-tab-panel-aside')).toBe(true);
    expect(fixture.componentInstance.nextId).toBe(0);
  });
});
