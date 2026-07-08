import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButton, MatButtonModule } from '@angular/material/button';

import { ButtonDirective } from './button.directive';

@Component({
  standalone: true,
  imports: [ButtonDirective, MatButtonModule],
  template: `<button mat-raised-button [emrButtonLoading]="loading">Save</button>`,
})
class HostComponent {
  loading = false;
  @ViewChild(ButtonDirective) directive!: ButtonDirective;
  @ViewChild(MatButton) matButton!: MatButton;
}

describe('ButtonDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance.directive).toBeTruthy();
  });

  it('should disable the button and add the loading class when loading becomes true', () => {
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
    expect(button.classList.contains('emr-button-loading')).toBe(true);
  });

  it('should re-enable the button and remove the loading class when loading becomes false', () => {
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    fixture.componentInstance.loading = false;
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(false);
    expect(button.classList.contains('emr-button-loading')).toBe(false);
  });

  it('should append a progress spinner while loading', () => {
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeTruthy();
  });

  it('should remove the progress spinner once loading finishes', () => {
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    fixture.componentInstance.loading = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeFalsy();
  });
});
