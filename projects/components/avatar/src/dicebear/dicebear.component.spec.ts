import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicebearComponent } from './dicebear.component';

describe('DicebearComponent', () => {
  let fixture: ComponentFixture<DicebearComponent>;
  let component: DicebearComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DicebearComponent] }).compileComponents();
    fixture = TestBed.createComponent(DicebearComponent);
    component = fixture.componentInstance;
  });

  it('should generate an identicon svg for the given seed by default', () => {
    fixture.componentRef.setInput('key', 'dicebear-seed-1');
    fixture.detectChanges();

    expect((component as any).svg).toContain('<svg');
    expect(fixture.nativeElement.querySelector('svg')).not.toBeNull();
  });

  it('should generate a different svg for the initials preset', () => {
    fixture.componentRef.setInput('key', 'dicebear-seed-2');
    fixture.componentRef.setInput('preset', 'initials');
    fixture.detectChanges();

    expect((component as any).svg).toContain('<svg');
  });

  it('should mark the image as loaded once onImageLoaded fires', () => {
    fixture.componentRef.setInput('key', 'dicebear-seed-3');
    fixture.componentRef.setInput('image', 'https://example.test/dicebear-unique-1.png');
    fixture.detectChanges();
    expect((component as any).imageLoaded).toBe(false);

    component.onImageLoaded();

    expect((component as any).imageLoaded).toBe(true);
  });
});
