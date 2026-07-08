import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordStrengthComponent } from './password-strength.component';

describe('PasswordStrengthComponent', () => {
  let fixture: ComponentFixture<PasswordStrengthComponent>;
  let component: PasswordStrengthComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PasswordStrengthComponent] }).compileComponents();
    fixture = TestBed.createComponent(PasswordStrengthComponent);
    component = fixture.componentInstance;
  });

  function setPassword(password: string) {
    fixture.componentRef.setInput('password', password);
    fixture.detectChanges();
  }

  it('should report 0 strength for an empty password', () => {
    setPassword('');
    expect(component.strength).toBe(0);
  });

  it('should increase strength as more rule categories are satisfied', () => {
    setPassword('a');
    const weak = component.strength;
    setPassword('aA1!aaaa');
    const strong = component.strength;
    expect(strong).toBeGreaterThan(weak);
  });

  it('should report full strength (100) when every enabled rule is satisfied', () => {
    setPassword('Aa1!aaaa');
    expect(component.strength).toBe(100);
    expect(component.isVeryStrong).toBe(true);
  });

  it('should emit strengthChanged when the password changes', () => {
    const emitted: number[] = [];
    component.strengthChanged.subscribe((v) => emitted.push(v));
    setPassword('Aa1!aaaa');
    expect(emitted.length).toBeGreaterThan(0);
    expect(emitted[emitted.length - 1]).toBe(100);
  });

  it('should skip the lower-case rule when disabled', () => {
    fixture.componentRef.setInput('enableLowerCaseLetterRule', false);
    setPassword('AAAA1!AA');
    expect(component.strength).toBe(100);
  });

  it('should propagate the strength value through the ControlValueAccessor', () => {
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);
    setPassword('Aa1!aaaa');
    expect(onChange).toHaveBeenCalledWith(100);
  });

  it('should restore strength from an external writeValue call', () => {
    component.writeValue(60);
    expect(component.strength).toBe(60);
    expect(component.isMedium).toBe(true);
  });
});
