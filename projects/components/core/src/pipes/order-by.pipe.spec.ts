import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;
  const items = [{ n: 3 }, { n: 1 }, { n: 2 }];

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('should sort ascending by default', () => {
    expect(pipe.transform([...items], 'n')).toEqual([{ n: 1 }, { n: 2 }, { n: 3 }]);
  });

  it('should sort descending when direction is desc', () => {
    expect(pipe.transform([...items], 'n', 'desc')).toEqual([{ n: 3 }, { n: 2 }, { n: 1 }]);
  });

  it('should throw when given a non-array value', () => {
    expect(() => pipe.transform('not-an-array' as any, 'n')).toThrowError('Order By value should be an array');
  });
});
