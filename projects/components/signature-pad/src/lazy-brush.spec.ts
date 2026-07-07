import { LazyBrush } from './lazy-brush';

describe('LazyBrush', () => {
  it('should default to enabled with a default radius', () => {
    const brush = new LazyBrush();
    expect(brush.isEnabled()).toBe(true);
    expect(brush.getRadius()).toBe(30);
  });

  it('should accept initial options', () => {
    const brush = new LazyBrush({ radius: 10, enabled: false, initialPoint: { x: 5, y: 5 } });
    expect(brush.getRadius()).toBe(10);
    expect(brush.isEnabled()).toBe(false);
    expect(brush.getBrushCoordinates()).toEqual({ x: 5, y: 5 });
  });

  it('should not move the brush while the pointer stays within the radius', () => {
    const brush = new LazyBrush({ radius: 30, initialPoint: { x: 0, y: 0 } });
    brush.update({ x: 10, y: 0 });
    expect(brush.brushHasMoved()).toBe(false);
    expect(brush.getBrushCoordinates()).toEqual({ x: 0, y: 0 });
  });

  it('should drag the brush toward the pointer once it exceeds the radius', () => {
    const brush = new LazyBrush({ radius: 10, initialPoint: { x: 0, y: 0 } });
    brush.update({ x: 100, y: 0 });
    expect(brush.brushHasMoved()).toBe(true);
    expect(brush.getBrushCoordinates().x).toBeGreaterThan(0);
    expect(brush.getDistance()).toBeCloseTo(100, 5);
  });

  it('should snap the brush directly to the pointer when disabled', () => {
    const brush = new LazyBrush({ enabled: true, initialPoint: { x: 0, y: 0 } });
    brush.disable();
    brush.update({ x: 50, y: 50 });
    expect(brush.getBrushCoordinates()).toEqual({ x: 50, y: 50 });
  });

  it('should move both pointer and brush together when "both" is set', () => {
    const brush = new LazyBrush({ initialPoint: { x: 0, y: 0 } });
    brush.update({ x: 20, y: 30 }, { both: true });
    expect(brush.getBrushCoordinates()).toEqual({ x: 20, y: 30 });
    expect(brush.getPointerCoordinates()).toEqual({ x: 20, y: 30 });
  });

  it('should return false from update when nothing meaningfully changed', () => {
    const brush = new LazyBrush({ initialPoint: { x: 5, y: 5 } });
    const changed = brush.update({ x: 5, y: 5 });
    expect(changed).toBe(false);
  });

  it('should clamp friction between 0 and 1', () => {
    const brush = new LazyBrush();
    brush.setFriction(2);
    expect(brush.getFriction()).toBe(1);
    brush.setFriction(-1);
    expect(brush.getFriction()).toBe(0);
  });
});
