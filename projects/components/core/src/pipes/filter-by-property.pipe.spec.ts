import { FilterByPropertyPipe } from './filter-by-property.pipe';

describe('FilterByPropertyPipe', () => {
  let pipe: FilterByPropertyPipe;
  const items = [
    { id: 1, status: 'open' },
    { id: 2, status: 'closed' },
    { id: 3, status: 'open' },
  ];

  beforeEach(() => {
    pipe = new FilterByPropertyPipe();
  });

  it('should return only items matching the property value', () => {
    expect(pipe.transform(items, 'status', 'open')).toEqual([items[0], items[2]]);
  });

  it('should return an empty array for a null items list', () => {
    expect(pipe.transform(null as any, 'status', 'open')).toEqual([]);
  });

  it('should return all items when the value is undefined', () => {
    expect(pipe.transform(items, 'status', undefined)).toEqual(items);
  });

  it('should return all items when value is an empty string and not strict', () => {
    expect(pipe.transform(items, 'status', '')).toEqual(items);
  });

  it('should filter out everything when value is empty string and strict', () => {
    expect(pipe.transform(items, 'status', '', true)).toEqual([]);
  });

  it('should support nested property paths', () => {
    const nested = [{ user: { role: 'admin' } }, { user: { role: 'guest' } }];
    expect(pipe.transform(nested, 'user.role', 'admin')).toEqual([nested[0]]);
  });
});
