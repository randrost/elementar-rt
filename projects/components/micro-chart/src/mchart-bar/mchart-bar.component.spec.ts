import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MchartBarComponent } from './mchart-bar.component';

describe('MchartBarComponent', () => {
  let fixture: ComponentFixture<MchartBarComponent>;
  let component: MchartBarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [MchartBarComponent] }).compileComponents();
    fixture = TestBed.createComponent(MchartBarComponent);
    component = fixture.componentInstance;
    // The component only renders once its host has a non-zero size, checked
    // in ngAfterViewChecked via getBoundingClientRect.
    spyOn(fixture.nativeElement, 'getBoundingClientRect').and.returnValue({ width: 200, height: 100 } as DOMRect);
    fixture.componentRef.setInput('data', [1, 5, 3]);
    fixture.componentRef.setInput('radius', 4);
    fixture.detectChanges();
    fixture.detectChanges(); // a second pass runs ngAfterViewChecked's render path
  });

  it('should render one bar per data point', () => {
    const bars = fixture.nativeElement.querySelectorAll('svg .data-container .bar');
    expect(bars.length).toBe(3);
  });

  it('should apply the configured corner radius to each bar', () => {
    const bar = fixture.nativeElement.querySelector('svg .data-container .bar');
    expect(bar.getAttribute('rx')).toBe('4');
  });

  it('should size the SVG viewBox to the host dimensions', () => {
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg.getAttribute('viewBox')).toBe('0 0 200 100');
  });

  it('should assign each instance a unique gradient id', () => {
    const fixture2 = TestBed.createComponent(MchartBarComponent);
    expect(fixture2.componentInstance.gradientId).not.toBe(component.gradientId);
  });

  it('should render highlight bars when highlight is enabled from the start', () => {
    const fixture2 = TestBed.createComponent(MchartBarComponent);
    spyOn(fixture2.nativeElement, 'getBoundingClientRect').and.returnValue({ width: 200, height: 100 } as DOMRect);
    fixture2.componentRef.setInput('data', [1, 5, 3]);
    fixture2.componentRef.setInput('highlight', true);
    fixture2.detectChanges();
    fixture2.detectChanges();
    const highlights = fixture2.nativeElement.querySelectorAll('svg .hl-container .highlight');
    expect(highlights.length).toBe(3);
  });
});
