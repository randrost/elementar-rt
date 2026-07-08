import { PositionManager } from './position-manager';

describe('PositionManager', () => {
  let manager: PositionManager;

  beforeEach(() => {
    manager = new PositionManager();
  });

  it('should build a primary position plus its fallback pair for below-start', () => {
    const [primary, fallback] = manager.build('below-start');
    expect(primary).toEqual({
      originY: 'bottom', overlayY: 'top', originX: 'start', overlayX: 'start',
      panelClass: ['emr-overlay-below', 'emr-overlay-below-start'],
    });
    expect(fallback.originY).toBe('top');
    expect(fallback.overlayY).toBe('bottom');
  });

  it('should build the correct fallback pair for before-center (an asymmetric mapping)', () => {
    const [, fallback] = manager.build('before-center');
    expect(fallback).toEqual(jasmine.objectContaining({ originX: 'end', overlayX: 'start' }));
  });

  it('should return two connected positions for every supported position', () => {
    const positions: any[] = [
      'below-start', 'below-center', 'below-end',
      'above-start', 'above-center', 'above-end',
      'before-start', 'before-center', 'before-end',
      'after-start', 'after-center', 'after-end',
    ];
    for (const pos of positions) {
      const result = manager.build(pos);
      expect(result.length).toBe(2);
      expect(result[0]).toBeTruthy();
      expect(result[1]).toBeTruthy();
    }
  });
});
