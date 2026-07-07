import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailMakerComponent } from './thumbnail-maker.component';

describe('ThumbnailMakerComponent', () => {
  let fixture: ComponentFixture<ThumbnailMakerComponent>;
  let component: ThumbnailMakerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ThumbnailMakerComponent] }).compileComponents();
    fixture = TestBed.createComponent(ThumbnailMakerComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('src', 'https://example.com/image.png');
    fixture.detectChanges();
  });

  it('should compute the minimum scale from the loaded image dimensions', () => {
    const img = { height: 150, width: 300 } as HTMLImageElement;
    (component as any).onLoad({ target: img } as unknown as Event);
    // thumbnail size defaults to 300: minScale = max(300/150, 300/300) = 2
    expect((component as any).scale).toBe(2);
    expect((component as any).min).toBe(200);
    expect((component as any).loading).toBe(false);
  });

  it('should increase the scale by 10% up to the max', () => {
    (component as any).scale = 0.5;
    (component as any).max = 100;
    (component as any).increase();
    expect((component as any).scale).toBeCloseTo(0.6, 5);
  });

  it('should clamp increase at the max scale', () => {
    (component as any).scale = 0.95;
    (component as any).max = 100;
    (component as any).increase();
    expect((component as any).scale).toBe(1);
  });

  it('should decrease the scale by 10% down to the min', () => {
    (component as any).scale = 0.5;
    (component as any).min = 10;
    (component as any).decrease();
    expect((component as any).scale).toBeCloseTo(0.4, 5);
  });

  it('should clamp decrease at the min scale', () => {
    (component as any).scale = 0.15;
    (component as any).min = 10;
    (component as any).decrease();
    expect((component as any).scale).toBe(0.1);
  });

  it('should update the scale from the slider via onScaleChange', () => {
    (component as any).onScaleChange(42);
    expect((component as any).scale).toBeCloseTo(0.42, 5);
  });
});
