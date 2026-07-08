import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeValueComponent } from './gauge-value.component';

describe('GaugeValueComponent', () => {
  let fixture: ComponentFixture<GaugeValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [GaugeValueComponent] }).compileComponents();
    fixture = TestBed.createComponent(GaugeValueComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-gauge-value')).toBe(true);
  });
});
