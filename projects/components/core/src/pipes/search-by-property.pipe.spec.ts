import { SearchByPropertyPipe } from './search-by-property.pipe';

describe('SearchByPropertyPipe', () => {
  let pipe: SearchByPropertyPipe;
  const items = [
    { name: 'Alice Johnson' },
    { name: 'Bob Smith' },
    { name: 'alicia keys' },
  ];

  beforeEach(() => {
    pipe = new SearchByPropertyPipe();
  });

  it('should return items whose property contains the search value (case-insensitive)', () => {
    expect(pipe.transform(items, 'name', 'alic')).toEqual([items[0], items[2]]);
  });

  it('should return all items when the search value is empty', () => {
    expect(pipe.transform(items, 'name', '')).toEqual(items);
  });

  it('should return an empty array for a null items list', () => {
    expect(pipe.transform(null, 'name', 'a')).toEqual([]);
  });

  it('should return an empty array when nothing matches', () => {
    expect(pipe.transform(items, 'name', 'zzz')).toEqual([]);
  });

  it('should exclude items whose property is not a string', () => {
    const mixed = [{ name: 42 }, { name: 'Alice' }];
    expect(pipe.transform(mixed as any, 'name', 'a')).toEqual([{ name: 'Alice' }]);
  });
});
