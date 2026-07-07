import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { CurrentPlanWidgetComponent } from './current-plan-widget.component';

describe('CurrentPlanWidgetComponent', () => {
  let component: CurrentPlanWidgetComponent;
  let fixture: ComponentFixture<CurrentPlanWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentPlanWidgetComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideNativeDateAdapter(),
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentPlanWidgetComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 'w1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
