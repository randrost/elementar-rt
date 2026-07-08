import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LAYOUT } from '../types';
import { LayoutSidebarStore } from '../layout.store';
import { LayoutSidebarComponent } from './layout-sidebar.component';

describe('LayoutSidebarComponent', () => {
  let component: LayoutSidebarComponent;
  let fixture: ComponentFixture<LayoutSidebarComponent>;
  let store: InstanceType<typeof LayoutSidebarStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutSidebarComponent],
      providers: [{ provide: LAYOUT, useValue: { layoutId: () => 'main' } }],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutSidebarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(LayoutSidebarStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to shown for a layoutId with no recorded visibility', () => {
    expect((component as any)._isShown()).toBe(true);
    expect(fixture.nativeElement.classList.contains('is-hidden')).toBe(false);
  });

  it('should hide once the store records this layoutId as not shown', () => {
    store.showSidebarVisibility('main', false);
    fixture.detectChanges();
    expect((component as any)._isShown()).toBe(false);
    expect(fixture.nativeElement.classList.contains('is-hidden')).toBe(true);
  });

  it('should not be affected by visibility changes for a different layoutId', () => {
    store.showSidebarVisibility('other-layout', false);
    fixture.detectChanges();
    expect((component as any)._isShown()).toBe(true);
  });
});
