import { FormControl } from '@angular/forms';

import { phoneValidator } from './phone.validator';

describe('phoneValidator', () => {
  it('should return null for an empty control value', () => {
    expect(phoneValidator(new FormControl(''))).toBeNull();
  });

  it('should return null for a valid international phone number', () => {
    expect(phoneValidator(new FormControl('+14155552671'))).toBeNull();
  });

  it('should return an invalidPhone error for an unparsable value', () => {
    const control = new FormControl('not-a-phone-number');
    expect(phoneValidator(control)).toEqual({ invalidPhone: true });
  });

  it('should return an invalidPhone error and clear the value for an invalid number', () => {
    const control = new FormControl('+1123');
    const result = phoneValidator(control);
    expect(result).toEqual({ invalidPhone: true });
    expect(control.value).toBeNull();
  });
});
