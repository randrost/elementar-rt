import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListComponent } from './file-list.component';

describe('FileListComponent', () => {
  let fixture: ComponentFixture<FileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FileListComponent] }).compileComponents();
    fixture = TestBed.createComponent(FileListComponent);
    fixture.detectChanges();
  });

  it('should apply its host class', () => {
    expect(fixture.nativeElement.classList.contains('emr-file-list')).toBe(true);
  });
});
