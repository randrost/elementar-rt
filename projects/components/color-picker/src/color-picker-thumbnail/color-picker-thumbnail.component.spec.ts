import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerThumbnailComponent } from './color-picker-thumbnail.component';

describe('ColorPickerThumbnailComponent', () => {
  let fixture: ComponentFixture<ColorPickerThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ColorPickerThumbnailComponent] }).compileComponents();
    fixture = TestBed.createComponent(ColorPickerThumbnailComponent);
  });

  it('should set the background css custom property from the color input', () => {
    fixture.componentRef.setInput('color', '#336699');
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).style.getPropertyValue('--emr-color-picker-thumbnail-bg')).toBe('#336699');
  });

  it('should not set the css variable when color is empty', () => {
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).style.getPropertyValue('--emr-color-picker-thumbnail-bg')).toBe('');
  });
});
