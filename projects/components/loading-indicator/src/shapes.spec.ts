import { interpolateShape, LOADING_SHAPE_POINTS, LOADING_SHAPES, shapeToPath } from './shapes';

describe('loading indicator shapes', () => {
  it('should sample every shape with the same number of normalized points', () => {
    expect(LOADING_SHAPES.length).toBe(7);
    for (const shape of LOADING_SHAPES) {
      expect(shape.length).toBe(LOADING_SHAPE_POINTS);
      expect(Math.max(...shape)).toBeCloseTo(1, 5);
      expect(Math.min(...shape)).toBeGreaterThan(0);
    }
  });

  it('should interpolate between shapes', () => {
    const [a, b] = LOADING_SHAPES;
    expect(interpolateShape(a, b, 0)).toEqual(a);
    expect(interpolateShape(a, b, 1)).toEqual(b);
    const mid = interpolateShape(a, b, 0.5);
    expect(mid[3]).toBeCloseTo((a[3] + b[3]) / 2, 10);
  });

  it('should build a closed cubic path', () => {
    const d = shapeToPath(LOADING_SHAPES[0]);
    expect(d.startsWith('M')).toBeTrue();
    expect(d.endsWith('Z')).toBeTrue();
    expect(d.split('C').length - 1).toBe(LOADING_SHAPE_POINTS);
  });
});
