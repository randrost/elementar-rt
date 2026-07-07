import { TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';

import { ValidatorRegistryService } from './validator-registry.service';

describe('ValidatorRegistryService', () => {
  let service: ValidatorRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorRegistryService);
  });

  it('should resolve the built-in "required" validator', () => {
    const validator = service.getValidator({ type: 'required', message: 'Required' });
    expect(validator(new FormControl(''))).toEqual({ required: true });
    expect(validator(new FormControl('x'))).toBeNull();
  });

  it('should resolve the built-in "email" validator', () => {
    const validator = service.getValidator({ type: 'email', message: 'Invalid email' });
    expect(validator(new FormControl('not-an-email'))?.['email']).toBeTruthy();
    expect(validator(new FormControl('a@b.com'))).toBeNull();
  });

  it('should resolve "minLength"/"maxLength" validators using the config value', () => {
    const min = service.getValidator({ type: 'minLength', value: 3, message: 'Too short' });
    expect(min(new FormControl('ab'))).toEqual(Validators.minLength(3)(new FormControl('ab')));
    expect(min(new FormControl('abc'))).toBeNull();
  });

  it('should resolve a "pattern" validator using the config value', () => {
    const validator = service.getValidator({ type: 'pattern', value: '^[0-9]+$', message: 'Digits only' });
    expect(validator(new FormControl('abc'))).toBeTruthy();
    expect(validator(new FormControl('123'))).toBeNull();
  });

  it('should fall back to a null validator for an unknown type', () => {
    const validator = service.getValidator({ type: 'unknown-type', message: 'x' });
    expect(validator(new FormControl(''))).toBeNull();
  });

  it('should allow registering a custom validator', () => {
    service.registerValidator('isEven', () => (control) => (Number(control.value) % 2 === 0 ? null : { odd: true }));
    const validator = service.getValidator({ type: 'isEven', message: 'Must be even' });
    expect(validator(new FormControl('3'))).toEqual({ odd: true });
    expect(validator(new FormControl('4'))).toBeNull();
  });
});
