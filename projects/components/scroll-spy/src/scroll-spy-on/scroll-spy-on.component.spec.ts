import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SCROLL_SPY_NAV } from '../types';
import { ScrollSpyOnComponent } from './scroll-spy-on.component';

describe('ScrollSpyOnComponent', () => {
  let component: ScrollSpyOnComponent;
  let fixture: ComponentFixture<ScrollSpyOnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollSpyOnComponent],
      providers: [{ provide: SCROLL_SPY_NAV, useValue: { activeId: null, scrollTo: () => {} } }],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollSpyOnComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('targetId', 'section-1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
