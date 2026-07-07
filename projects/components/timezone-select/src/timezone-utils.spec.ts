import { TimezoneUtils } from './timezone-utils';

describe('TimezoneUtils', () => {
  it('should return a non-empty flat list of IANA timezone ids', () => {
    const all = TimezoneUtils.getAll(false);
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThan(0);
    expect(all).toContain('America/New_York');
  });

  it('should group timezone ids by their region prefix', () => {
    const grouped = TimezoneUtils.getAll(true);
    expect(grouped['America']).toBeDefined();
    expect(grouped['America']).toContain('America/New_York');
  });

  it('should return localized timezones sorted by display name', () => {
    const localized = TimezoneUtils.getLocalizedAll('en-US', false);
    expect(localized.length).toBeGreaterThan(0);
    expect(localized.every((tz) => !!tz.id && !!tz.name)).toBe(true);
    const sorted = [...localized].sort((a, b) => a.name.localeCompare(b.name));
    expect(localized.map((tz) => tz.id)).toEqual(sorted.map((tz) => tz.id));
  });

  it('should group localized timezones by region, sorted alphabetically by group key', () => {
    const grouped = TimezoneUtils.getLocalizedAll('en-US', true);
    expect(grouped.length).toBeGreaterThan(0);
    const groupNames = grouped.map((g) => g.name);
    expect(groupNames).toEqual([...groupNames].sort());
    const americaGroup = grouped.find((g) => g.name === 'America');
    expect(americaGroup?.timezones.some((tz) => tz.id === 'America/New_York')).toBe(true);
  });
});
