import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadingPlaceholderComponent } from './image-uploading-placeholder.component';

// This is a tiptap node-view component: tiptap normally sets `node`, `extension`
// and `editor`. Provide minimal stubs so ngOnInit can run without throwing.
const editorStub = {
  chain: () => ({ focus: () => ({ setImage: () => ({ run: () => {} }) }) }),
} as any;

describe('ImageUploadingPlaceholderComponent', () => {
  let component: ImageUploadingPlaceholderComponent;
  let fixture: ComponentFixture<ImageUploadingPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageUploadingPlaceholderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageUploadingPlaceholderComponent);
    component = fixture.componentInstance;
    // 1x1 transparent PNG data URI so _dataURItoBlob can decode it.
    const dataUri =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    fixture.componentRef.setInput('node', { attrs: { src: dataUri } });
    fixture.componentRef.setInput('extension', {
      options: { uploadFn: () => Promise.resolve(dataUri) },
    });
    fixture.componentRef.setInput('editor', editorStub);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
