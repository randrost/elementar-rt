import { FormControl } from '@angular/forms';

import { expiryDateValidator } from './expiry-date-validator';

describe('expiryDateValidator', () => {
  const validator = expiryDateValidator();

  it('should return null for an empty value', () => {
    expect(validator(new FormControl(''))).toBeNull();
  });

  it('should return null for a value that is not 4 characters', () => {
    expect(validator(new FormControl('123'))).toBeNull();
  });

  it('should return null for a future month/year', () => {
    const future = new Date();
    future.setFullYear(future.getFullYear() + 5);
    const mm = '01';
    const yy = future.getFullYear().toString().slice(-2);
    expect(validator(new FormControl(mm + yy))).toBeNull();
  });

  it('should return an error for a past year', () => {
    expect(validator(new FormControl('0120'))).toEqual({ expiryDateInPast: true });
  });

  it('should return an error for the current year but an earlier month', () => {
    const now = new Date();
    const yy = now.getFullYear().toString().slice(-2);
    // January is always <= the current month, so it's only "past" if we're not in January.
    if (now.getMonth() + 1 > 1) {
      expect(validator(new FormControl('01' + yy))).toEqual({ expiryDateInPast: true });
    } else {
      expect(validator(new FormControl('01' + yy))).toBeNull();
    }
  });
});
