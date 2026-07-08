import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageLogoComponent } from './image-logo.component';

describe('ImageLogoComponent', () => {
  let fixture: ComponentFixture<ImageLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ImageLogoComponent] }).compileComponents();
    fixture = TestBed.createComponent(ImageLogoComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
