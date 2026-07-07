import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentFadeComponent } from './content-fade.component';

describe('ContentFadeComponent', () => {
  let fixture: ComponentFixture<ContentFadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ContentFadeComponent] }).compileComponents();
    fixture = TestBed.createComponent(ContentFadeComponent);
  });

  it('should default to the both position class', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('position-both')).toBe(true);
  });

  it('should switch to the start/end position classes', () => {
    fixture.componentRef.setInput('position', 'start');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('position-start')).toBe(true);
    expect(fixture.nativeElement.classList.contains('position-both')).toBe(false);

    fixture.componentRef.setInput('position', 'end');
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('position-end')).toBe(true);
  });

  it('should set the width and color css custom properties from inputs', () => {
    fixture.componentRef.setInput('width', '40px');
    fixture.componentRef.setInput('color', 'red');
    fixture.detectChanges();

    const style = (fixture.nativeElement as HTMLElement).style;
    expect(style.getPropertyValue('--emr-content-fade-width')).toBe('40px');
    expect(style.getPropertyValue('--emr-content-fade-color')).toBe('red');
    expect(style.getPropertyPriority('--emr-content-fade-width')).toBe('important');
  });
});
