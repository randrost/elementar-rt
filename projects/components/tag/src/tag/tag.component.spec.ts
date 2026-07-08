import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagComponent } from './tag.component';

describe('TagComponent', () => {
  let fixture: ComponentFixture<TagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TagComponent] }).compileComponents();
    fixture = TestBed.createComponent(TagComponent);
    fixture.detectChanges();
  });

  it('should default to the soft/default/md variant attributes', () => {
    expect(fixture.nativeElement.getAttribute('data-variant')).toBe('soft');
    expect(fixture.nativeElement.getAttribute('data-color')).toBe('default');
    expect(fixture.nativeElement.getAttribute('data-size')).toBe('md');
  });

  it('should reflect variant/color/size input changes onto host attributes', () => {
    fixture.componentRef.setInput('variant', 'outlined');
    fixture.componentRef.setInput('color', 'success');
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();

    expect(fixture.nativeElement.getAttribute('data-variant')).toBe('outlined');
    expect(fixture.nativeElement.getAttribute('data-color')).toBe('success');
    expect(fixture.nativeElement.getAttribute('data-size')).toBe('lg');
  });
});
