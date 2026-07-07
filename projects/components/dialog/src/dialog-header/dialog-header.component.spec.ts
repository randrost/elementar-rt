import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHeaderComponent } from './dialog-header.component';

@Component({
  imports: [DialogHeaderComponent],
  template: `<emr-dialog-header>content</emr-dialog-header>`
})
class HostComponent {}

describe('DialogHeaderComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should project its content and apply its host class', () => {
    const el = fixture.nativeElement.firstElementChild;
    expect(el.classList.contains('emr-dialog-header')).toBe(true);
    expect(el.textContent.trim()).toBe('content');
  });
});
