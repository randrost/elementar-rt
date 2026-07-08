import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { LinkDialog } from './link.dialog';

describe('LinkDialog', () => {
  let component: LinkDialog;
  let fixture: ComponentFixture<LinkDialog>;
  const dialogRef = { close: jasmine.createSpy('close') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkDialog],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { linkUrl: '' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with the current url on submit', () => {
    (component as any).linkUrl = 'https://example.com';
    (component as any).onSubmit();
    expect(dialogRef.close).toHaveBeenCalledWith('https://example.com');
  });
});
