import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingIndicatorComponent } from './loading-indicator.component';

describe('LoadingIndicatorComponent', () => {
  let component: LoadingIndicatorComponent;
  let fixture: ComponentFixture<LoadingIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingIndicatorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose progressbar semantics with a default label', () => {
    const host: HTMLElement = fixture.nativeElement;
    expect(host.getAttribute('role')).toBe('progressbar');
    expect(host.getAttribute('aria-label')).toBe('Loading');
  });

  it('should render the initial shape path', () => {
    const path: SVGPathElement = fixture.nativeElement.querySelector('path');
    expect(path.getAttribute('d')).toMatch(/^M[\d.]+ [\d.]+C/);
  });

  it('should toggle the contained class', () => {
    fixture.componentRef.setInput('contained', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.classList).toContain('is-contained');
  });

  it('should morph the path over time', async () => {
    fixture.componentRef.setInput('duration', 50);
    fixture.detectChanges();
    const path: SVGPathElement = fixture.nativeElement.querySelector('path');
    const initial = path.getAttribute('d');
    await new Promise(resolve => setTimeout(resolve, 120));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      expect(path.getAttribute('d')).toBe(initial);
    } else {
      expect(path.getAttribute('d')).not.toBe(initial);
    }
  });
});
