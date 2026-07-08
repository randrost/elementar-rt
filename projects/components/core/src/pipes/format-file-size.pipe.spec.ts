import { FormatFileSizePipe } from './format-file-size.pipe';

describe('FormatFileSizePipe', () => {
  let pipe: FormatFileSizePipe;

  beforeEach(() => {
    pipe = new FormatFileSizePipe();
  });

  it('should format 0 bytes', () => {
    expect(pipe.transform(0)).toBe('0 Bytes');
  });

  it('should format bytes into KB', () => {
    expect(pipe.transform(1500)).toBe('1.5 KB');
  });

  it('should format bytes into MB', () => {
    expect(pipe.transform(2_500_000)).toBe('2.5 MB');
  });

  it('should respect a custom decimal point precision', () => {
    expect(pipe.transform(1234, 1)).toBe('1.2 KB');
  });

  it('should fall back to 2 decimals when decimalPoint is 0 (falsy)', () => {
    // `decimalPoint || 2` treats 0 as "not provided", so 0 does not mean
    // "no decimals" here — this documents the pipe's actual behavior.
    expect(pipe.transform(1234, 0)).toBe('1.23 KB');
  });
});
