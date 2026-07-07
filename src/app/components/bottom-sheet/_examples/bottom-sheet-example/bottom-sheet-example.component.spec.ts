import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { BottomSheetExampleComponent } from './bottom-sheet-example.component';

describe('BottomSheetExampleComponent', () => {
  let component: BottomSheetExampleComponent;
  let fixture: ComponentFixture<BottomSheetExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomSheetExampleComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideNativeDateAdapter(),
        provideNoopAnimations(),
        { provide: MatBottomSheetRef, useValue: { dismiss: () => {} } },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomSheetExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
