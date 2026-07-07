import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFooterComponent } from './dialog-footer.component';

@Component({
  imports: [DialogFooterComponent],
  template: `<emr-dialog-footer>content</emr-dialog-footer>`
})
class HostComponent {}

describe('DialogFooterComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should project its content and apply its host class', () => {
    const el = fixture.nativeElement.firstElementChild;
    expect(el.classList.contains('emr-dialog-footer')).toBe(true);
    expect(el.textContent.trim()).toBe('content');
  });
});
