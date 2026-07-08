import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAsideComponent } from './panel-aside.component';

describe('PanelAsideComponent', () => {
  let fixture: ComponentFixture<PanelAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PanelAsideComponent] }).compileComponents();
    fixture = TestBed.createComponent(PanelAsideComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
