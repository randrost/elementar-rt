import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressBarComponent', () => {
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ProgressBarComponent] }).compileComponents();
    fixture = TestBed.createComponent(ProgressBarComponent);
    fixture.detectChanges();
  });

  it('should expose aria progressbar attributes only in determinate mode', () => {
    fixture.componentRef.setInput('value', 40);
    fixture.detectChanges();

    expect(fixture.nativeElement.getAttribute('role')).toBe('progressbar');
    expect(fixture.nativeElement.getAttribute('aria-valuenow')).toBe('40');
    expect(fixture.nativeElement.getAttribute('aria-valuemin')).toBe('0');
    expect(fixture.nativeElement.getAttribute('aria-valuemax')).toBe('100');

    fixture.componentRef.setInput('mode', 'indeterminate');
    fixture.detectChanges();
    expect(fixture.nativeElement.getAttribute('aria-valuenow')).toBeNull();
  });

  it('should clamp the fill width between 0 and 100 percent', () => {
    fixture.componentRef.setInput('value', 150);
    fixture.detectChanges();
    expect((fixture.componentInstance as any)._fillWidth()).toBe('100%');

    fixture.componentRef.setInput('value', -20);
    fixture.detectChanges();
    expect((fixture.componentInstance as any)._fillWidth()).toBe('0%');

    fixture.componentRef.setInput('value', 55);
    fixture.detectChanges();
    expect((fixture.componentInstance as any)._fillWidth()).toBe('55%');
  });

  it('should clamp the buffer width the same way', () => {
    fixture.componentRef.setInput('bufferValue', 200);
    fixture.detectChanges();
    expect((fixture.componentInstance as any)._bufferWidth()).toBe('100%');
  });

  it('should reflect mode and color as host attributes', () => {
    fixture.componentRef.setInput('mode', 'buffer');
    fixture.componentRef.setInput('color', 'success');
    fixture.detectChanges();

    expect(fixture.nativeElement.getAttribute('data-mode')).toBe('buffer');
    expect(fixture.nativeElement.getAttribute('data-color')).toBe('success');
  });
});
