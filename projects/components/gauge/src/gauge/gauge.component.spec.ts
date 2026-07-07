import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeComponent } from './gauge.component';

describe('GaugeComponent', () => {
  let fixture: ComponentFixture<GaugeComponent>;
  let component: GaugeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [GaugeComponent] }).compileComponents();
    fixture = TestBed.createComponent(GaugeComponent);
    component = fixture.componentInstance;
  });

  it('should compute a full stroke offset for 0%', () => {
    fixture.componentRef.setInput('value', 0);
    fixture.componentRef.setInput('radius', 50);
    fixture.detectChanges();
    const circumference = 2 * Math.PI * 50;
    expect((component as any).strokeDashoffset).toBeCloseTo(circumference, 5);
  });

  it('should compute a zero stroke offset for 100%', () => {
    fixture.componentRef.setInput('value', 100);
    fixture.componentRef.setInput('radius', 50);
    fixture.detectChanges();
    expect((component as any).strokeDashoffset).toBeCloseTo(0, 5);
  });

  it('should compute a half offset for 50%', () => {
    fixture.componentRef.setInput('value', 50);
    fixture.componentRef.setInput('radius', 50);
    fixture.detectChanges();
    const circumference = 2 * Math.PI * 50;
    expect((component as any).strokeDashoffset).toBeCloseTo(circumference / 2, 5);
  });
});
