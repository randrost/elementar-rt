import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';

describe('GridComponent', () => {
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [GridComponent] }).compileComponents();
    fixture = TestBed.createComponent(GridComponent);
    fixture.detectChanges();
  });

  it('should default to a single column with no gap set', () => {
    const style = (fixture.nativeElement as HTMLElement).style;
    expect(style.getPropertyValue('--emr-grid-cols')).toBe('repeat(1, 1fr)');
    expect(style.getPropertyValue('--emr-grid-gap')).toBe('');
  });

  it('should expand a numeric columns input into a repeat() track list', () => {
    fixture.componentRef.setInput('columns', 4);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).style.getPropertyValue('--emr-grid-cols')).toBe('repeat(4, 1fr)');
  });

  it('should fall back to the xs breakpoint (or 1) when columns is a responsive object', () => {
    fixture.componentRef.setInput('columns', { xs: 2, md: 4 });
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).style.getPropertyValue('--emr-grid-cols')).toBe('repeat(2, 1fr)');

    fixture.componentRef.setInput('columns', { md: 4 });
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).style.getPropertyValue('--emr-grid-cols')).toBe('repeat(1, 1fr)');
  });

  it('should set gap/align/justify css variables from inputs', () => {
    fixture.componentRef.setInput('gap', '2rem');
    fixture.componentRef.setInput('align', 'center');
    fixture.componentRef.setInput('justify', 'end');
    fixture.detectChanges();

    const style = (fixture.nativeElement as HTMLElement).style;
    expect(style.getPropertyValue('--emr-grid-gap')).toBe('2rem');
    expect(style.getPropertyValue('--emr-grid-align')).toBe('center');
    expect(style.getPropertyValue('--emr-grid-justify')).toBe('end');
  });
});
