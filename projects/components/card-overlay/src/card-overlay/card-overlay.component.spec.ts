import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOverlayComponent } from './card-overlay.component';

describe('CardOverlayComponent', () => {
  let fixture: ComponentFixture<CardOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CardOverlayComponent] }).compileComponents();
    fixture = TestBed.createComponent(CardOverlayComponent);
    fixture.detectChanges();
  });

  it('should reflect withTranslate/withBlur/disabled as host classes', () => {
    fixture.componentRef.setInput('withTranslate', true);
    fixture.componentRef.setInput('withBlur', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('with-translate')).toBe(true);
    expect(fixture.nativeElement.classList.contains('with-blur')).toBe(true);
    expect(fixture.nativeElement.classList.contains('is-disabled')).toBe(true);
  });
});
