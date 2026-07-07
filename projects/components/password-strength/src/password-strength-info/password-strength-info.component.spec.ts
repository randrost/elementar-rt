import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordStrengthComponent } from '../password-strength/password-strength.component';
import { PasswordStrengthInfoComponent } from './password-strength-info.component';

@Component({
  imports: [PasswordStrengthComponent, PasswordStrengthInfoComponent],
  template: `
    <emr-password-strength #ps [password]="password"/>
    <emr-password-strength-info [passwordComponent]="ps"/>
  `
})
class HostComponent {
  password = 'aA1!aaaa';
}

describe('PasswordStrengthInfoComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should render without error given a real PasswordStrengthComponent instance', () => {
    expect(fixture.nativeElement.querySelector('emr-password-strength-info')).not.toBeNull();
  });

  it('should show a done icon for satisfied criteria messages', () => {
    const icons = Array.from(fixture.nativeElement.querySelectorAll('mat-icon')).map((el: any) => el.textContent.trim());
    expect(icons).toContain('done');
  });
});
