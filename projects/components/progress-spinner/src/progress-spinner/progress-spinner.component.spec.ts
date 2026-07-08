import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressSpinnerComponent } from './progress-spinner.component';

describe('ProgressSpinnerComponent', () => {
  let fixture: ComponentFixture<ProgressSpinnerComponent>;
  let component: ProgressSpinnerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ProgressSpinnerComponent] }).compileComponents();
    fixture = TestBed.createComponent(ProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should size the svg to the diameter input and center the circles', () => {
    fixture.componentRef.setInput('diameter', 60);
    fixture.detectChanges();

    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg.getAttribute('width')).toBe('60');
    expect(svg.getAttribute('height')).toBe('60');
    expect(svg.querySelector('.spinner-track').getAttribute('cx')).toBe('30');
  });

  it('should compute the stroke radius from diameter and strokeWidth', () => {
    fixture.componentRef.setInput('diameter', 40);
    fixture.componentRef.setInput('strokeWidth', 4);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.spinner-track').getAttribute('r')).toBe('18');
  });

  it('should show determinate aria attributes and a dash offset proportional to value', () => {
    fixture.componentRef.setInput('mode', 'determinate');
    fixture.componentRef.setInput('value', 50);
    fixture.detectChanges();

    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg.getAttribute('role')).toBe('progressbar');
    expect(svg.getAttribute('aria-valuenow')).toBe('50');

    const circumference = (component as any)._circumference();
    expect(parseFloat(fixture.nativeElement.querySelector('.spinner-fill').getAttribute('stroke-dashoffset'))).toBeCloseTo(circumference * 0.5, 5);
  });

  it('should clamp determinate value between 0 and 100', () => {
    fixture.componentRef.setInput('mode', 'determinate');
    fixture.componentRef.setInput('value', 150);
    fixture.detectChanges();

    const circumference = (component as any)._circumference();
    expect(parseFloat(fixture.nativeElement.querySelector('.spinner-fill').getAttribute('stroke-dashoffset'))).toBeCloseTo(0, 5);
  });

  it('should use a status role and no aria-valuenow in indeterminate mode', () => {
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg.getAttribute('role')).toBe('status');
    expect(svg.getAttribute('aria-valuenow')).toBeNull();
  });
});
