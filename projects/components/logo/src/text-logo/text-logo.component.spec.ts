import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextLogoComponent } from './text-logo.component';

describe('TextLogoComponent', () => {
  let fixture: ComponentFixture<TextLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TextLogoComponent] }).compileComponents();
    fixture = TestBed.createComponent(TextLogoComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-text-logo')).toBe(true);
  });
});
