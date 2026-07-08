import { SearchPipe } from './search.pipe';
import { Country } from './model/country.model';

describe('SearchPipe', () => {
  let pipe: SearchPipe;
  const countries: Country[] = [
    { name: 'United States', shortCode: 'us', phoneCode: '+1' } as Country,
    { name: 'United Kingdom', shortCode: 'gb', phoneCode: '+44' } as Country,
    { name: 'Germany', shortCode: 'de', phoneCode: '+49' } as Country,
  ];

  beforeEach(() => {
    pipe = new SearchPipe();
  });

  it('should return all countries when there is no search criteria', () => {
    expect(pipe.transform(countries)).toEqual(countries);
  });

  it('should filter countries by name (case-insensitive)', () => {
    expect(pipe.transform(countries, 'united')).toEqual([countries[0], countries[1]]);
  });

  it('should filter countries by phone code', () => {
    expect(pipe.transform(countries, '+49')).toEqual([countries[2]]);
  });

  it('should return an empty array when nothing matches', () => {
    expect(pipe.transform(countries, 'zzz')).toEqual([]);
  });
});
