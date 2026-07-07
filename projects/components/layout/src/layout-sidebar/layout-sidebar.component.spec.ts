import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LAYOUT } from '../types';
import { LayoutSidebarStore } from '../layout.store';
import { LayoutSidebarComponent } from './layout-sidebar.component';

describe('LayoutSidebarComponent', () => {
  let component: LayoutSidebarComponent;
  let fixture: ComponentFixture<LayoutSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutSidebarComponent],
      providers: [
        { provide: LAYOUT, useValue: { layoutId: () => 'main' } },
        { provide: LayoutSidebarStore, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
