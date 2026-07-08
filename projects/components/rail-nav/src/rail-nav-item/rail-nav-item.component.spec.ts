import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RAIL_NAV } from '../types';
import { RailNavItemComponent } from './rail-nav-item.component';

const railNavStub = {
  api: { getActiveKey: () => null, isActive: () => false, activateItem: () => {} },
};

describe('RailNavItemComponent', () => {
  let component: RailNavItemComponent;
  let fixture: ComponentFixture<RailNavItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RailNavItemComponent],
      providers: [{ provide: RAIL_NAV, useValue: railNavStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(RailNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
