import { FilterTimezonesPipe } from './filter-timezones.pipe';
import { TimezoneGroup } from './timezone-utils';

describe('FilterTimezonesPipe', () => {
  let pipe: FilterTimezonesPipe;
  const groups: TimezoneGroup[] = [
    {
      name: 'America',
      timezones: [
        { id: 'America/New_York', name: 'Eastern Time', shortName: 'ET', offsetName: 'GMT-5' },
        { id: 'America/Chicago', name: 'Central Time', shortName: 'CT', offsetName: 'GMT-6' },
      ],
    },
    {
      name: 'Europe',
      timezones: [
        { id: 'Europe/London', name: 'Greenwich Mean Time', shortName: 'GMT', offsetName: 'GMT+0' },
      ],
    },
  ];

  beforeEach(() => {
    pipe = new FilterTimezonesPipe();
  });

  it('should return the input unchanged when there is no search term', () => {
    expect(pipe.transform(groups, '')).toEqual(groups);
  });

  it('should return null/undefined input unchanged', () => {
    expect(pipe.transform(null, 'a')).toBeNull();
  });

  it('should filter timezones within a group by name', () => {
    const result = pipe.transform(groups, 'eastern');
    expect(result?.length).toBe(1);
    expect(result?.[0].timezones.length).toBe(1);
    expect(result?.[0].timezones[0].id).toBe('America/New_York');
  });

  it('should keep an entire group when the group name matches', () => {
    const result = pipe.transform(groups, 'europe');
    expect(result?.length).toBe(1);
    expect(result?.[0].timezones.length).toBe(1);
  });

  it('should match by short name and offset name', () => {
    expect(pipe.transform(groups, 'GMT-6')?.[0].timezones[0].id).toBe('America/Chicago');
    expect(pipe.transform(groups, 'ET')?.[0].timezones[0].id).toBe('America/New_York');
  });

  it('should return no groups when nothing matches', () => {
    expect(pipe.transform(groups, 'zzz-nonexistent')).toEqual([]);
  });
});
