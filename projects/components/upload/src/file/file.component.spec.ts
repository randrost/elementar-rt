import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileComponent } from './file.component';

describe('FileComponent', () => {
  let fixture: ComponentFixture<FileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FileComponent] }).compileComponents();
    fixture = TestBed.createComponent(FileComponent);
    fixture.componentRef.setInput('name', 'report.pdf');
    fixture.detectChanges();
  });

  it('should default to the uploading state without the error class', () => {
    expect(fixture.nativeElement.classList.contains('has-error')).toBe(false);
  });

  it('should reflect the error state as a host class', () => {
    fixture.componentRef.setInput('state', 'error');
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('has-error')).toBe(true);
  });
});
