import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IMAGE_VIEWER_PICTURE_DATA, IMAGE_VIEWER_PICTURE_REF } from '../types';
import { ImageViewerComponent } from './image-viewer.component';

const dataStub = {
  title: '',
  caption: '',
  description: '',
  sourceUrl: 'https://example.com/a.jpg',
};
const pictureRefStub = { close: () => {} };

describe('ImageViewerComponent', () => {
  let component: ImageViewerComponent;
  let fixture: ComponentFixture<ImageViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageViewerComponent],
      providers: [
        { provide: IMAGE_VIEWER_PICTURE_DATA, useValue: dataStub },
        { provide: IMAGE_VIEWER_PICTURE_REF, useValue: pictureRefStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
