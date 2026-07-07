import { LazyPoint } from './lazy-point';

describe('LazyPoint', () => {
  it('should update its coordinates', () => {
    const p = new LazyPoint(0, 0);
    p.update({ x: 5, y: 10 });
    expect(p.x).toBe(5);
    expect(p.y).toBe(10);
  });

  it('should report equality by coordinates', () => {
    const p = new LazyPoint(3, 4);
    expect(p.equalsTo({ x: 3, y: 4 })).toBe(true);
    expect(p.equalsTo({ x: 3, y: 5 })).toBe(false);
  });

  it('should compute the difference to another point', () => {
    const p = new LazyPoint(10, 10);
    const diff = p.getDifferenceTo({ x: 4, y: 6 });
    expect(diff.x).toBe(6);
    expect(diff.y).toBe(4);
  });

  it('should compute the euclidean distance to another point', () => {
    const p = new LazyPoint(0, 0);
    expect(p.getDistanceTo({ x: 3, y: 4 })).toBe(5);
  });

  it('should compute the angle to another point', () => {
    const p = new LazyPoint(0, 0);
    const angle = p.getAngleTo({ x: 1, y: 0 });
    expect(angle).toBeCloseTo(Math.PI, 5);
  });

  it('should move by a given angle and distance', () => {
    const p = new LazyPoint(0, 0);
    p.moveByAngle(0, 10);
    expect(p.x).toBeCloseTo(10, 5);
    expect(p.y).toBeCloseTo(0, 5);
  });

  it('should serialize to a plain point object', () => {
    const p = new LazyPoint(1, 2);
    expect(p.toObject()).toEqual({ x: 1, y: 2 });
  });
});
