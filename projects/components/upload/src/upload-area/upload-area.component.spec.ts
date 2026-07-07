import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAreaComponent } from './upload-area.component';

function makeDragEvent(items: any[] | null): any {
  return {
    dataTransfer: items ? { items } : null,
    preventDefault: () => {},
    stopPropagation: () => {},
    relatedTarget: null
  };
}

function makeDropEvent(files: File[]): any {
  return {
    dataTransfer: { files },
    preventDefault: () => {},
    stopPropagation: () => {}
  };
}

describe('UploadAreaComponent', () => {
  let fixture: ComponentFixture<UploadAreaComponent>;
  let component: UploadAreaComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [UploadAreaComponent] }).compileComponents();
    fixture = TestBed.createComponent(UploadAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should mark drop active on dragenter when no accept restriction is configured', () => {
    (component as any).handleDragEnter(makeDragEvent([{ kind: 'file', type: 'image/png' }]));
    expect(component.api.isDropActive).toBe(true);
    expect((component as any).isDropInvalid()).toBe(false);
  });

  it('should mark drop invalid on dragenter when a dragged item does not match accept', () => {
    fixture.componentRef.setInput('accept', 'image/png');
    fixture.detectChanges();

    (component as any).handleDragEnter(makeDragEvent([{ kind: 'file', type: 'text/plain' }]));
    expect(component.api.isDropActive).toBe(false);
    expect((component as any).isDropInvalid()).toBe(true);
  });

  it('should allow wildcard mime types like image/* on dragenter', () => {
    fixture.componentRef.setInput('accept', 'image/*');
    fixture.detectChanges();

    (component as any).handleDragEnter(makeDragEvent([{ kind: 'file', type: 'image/jpeg' }]));
    expect(component.api.isDropActive).toBe(true);
  });

  it('should clear drop state on dragleave when leaving the upload area', () => {
    (component as any).isDropActive.set(true);
    const event = { relatedTarget: document.createElement('span'), preventDefault: () => {} };
    (component as any).handleDragLeave(event as any);
    expect(component.api.isDropActive).toBe(false);
  });

  it('should not throw and should emit selected files on drop when no accept is configured', () => {
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    const emitted: any[] = [];
    component.fileSelected.subscribe(e => emitted.push(e));

    expect(() => (component as any).handleDrop(makeDropEvent([file]))).not.toThrow();

    expect(emitted.length).toBe(1);
    expect(emitted[0].files).toEqual([file]);
    expect(component.api.isDropActive).toBe(false);
  });

  it('should filter out files that do not match accept on drop', () => {
    fixture.componentRef.setInput('accept', 'image/*');
    fixture.detectChanges();

    const validFile = new File(['a'], 'a.png', { type: 'image/png' });
    const invalidFile = new File(['b'], 'b.txt', { type: 'text/plain' });
    const emitted: any[] = [];
    component.fileSelected.subscribe(e => emitted.push(e));

    (component as any).handleDrop(makeDropEvent([validFile, invalidFile]));

    expect(emitted.length).toBe(1);
    expect(emitted[0].files).toEqual([validFile]);
  });

  it('should not emit fileSelected when no dropped files match accept', () => {
    fixture.componentRef.setInput('accept', 'image/*');
    fixture.detectChanges();

    const invalidFile = new File(['b'], 'b.txt', { type: 'text/plain' });
    const emitted: any[] = [];
    component.fileSelected.subscribe(e => emitted.push(e));

    (component as any).handleDrop(makeDropEvent([invalidFile]));

    expect(emitted.length).toBe(0);
  });

  it('should reset drop state on dragend', () => {
    (component as any).isDropActive.set(true);
    (component as any).isDropInvalid.set(true);
    (component as any).handleDragEnd({ preventDefault: () => {} });
    expect(component.api.isDropActive).toBe(false);
    expect((component as any).isDropInvalid()).toBe(false);
  });
});
