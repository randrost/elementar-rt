import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { ExploreWidgetComponent } from './explore-widget.component';

describe('ExploreWidgetComponent', () => {
  let component: ExploreWidgetComponent;
  let fixture: ComponentFixture<ExploreWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreWidgetComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideNativeDateAdapter(),
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreWidgetComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 'w1');
    fixture.componentRef.setInput('widget', { title: 'Title', description: 'Description', image: '', images: [], items: [], preview: '', paragraph: '', viewMore: null, data: {}, name: 'Widget' } as any);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
