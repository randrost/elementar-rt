import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatCardComponent } from './stat-card.component';

describe('StatCardComponent', () => {
  let fixture: ComponentFixture<StatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [StatCardComponent] }).compileComponents();
    fixture = TestBed.createComponent(StatCardComponent);
    fixture.detectChanges();
  });

  it('should default to a neutral trend attribute', () => {
    expect(fixture.nativeElement.getAttribute('data-trend')).toBe('neutral');
  });

  it('should reflect the trend input as a host attribute', () => {
    fixture.componentRef.setInput('trend', 'up');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('data-trend')).toBe('up');
  });
});
