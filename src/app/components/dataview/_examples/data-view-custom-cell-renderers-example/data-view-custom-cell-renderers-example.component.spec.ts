import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { DataViewCustomCellRenderersExampleComponent } from './data-view-custom-cell-renderers-example.component';

describe('DataViewCustomCellRenderersExampleComponent', () => {
  let component: DataViewCustomCellRenderersExampleComponent;
  let fixture: ComponentFixture<DataViewCustomCellRenderersExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataViewCustomCellRenderersExampleComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideNativeDateAdapter(),
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataViewCustomCellRenderersExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
