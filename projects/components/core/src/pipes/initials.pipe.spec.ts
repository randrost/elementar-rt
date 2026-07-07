import { InitialsPipe } from './initials.pipe';

describe('InitialsPipe', () => {
  let pipe: InitialsPipe;

  beforeEach(() => {
    pipe = new InitialsPipe();
  });

  it('should return first and last initials for a full name', () => {
    expect(pipe.transform('John Doe')).toBe('JD');
  });

  it('should return a single initial for a one-word name', () => {
    expect(pipe.transform('Cher')).toBe('C');
  });

  it('should return an empty string for falsy input', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should uppercase initials from lowercase names', () => {
    expect(pipe.transform('jane smith')).toBe('JS');
  });

  it('should use the first and last word for names with more than two words', () => {
    expect(pipe.transform('Mary Jane Watson')).toBe('MW');
  });
});
