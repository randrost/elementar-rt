/**
 * Shapes used by the Material 3 Expressive loading indicator.
 *
 * Every shape is described as a polar radius function `r(θ)` and sampled at the
 * same number of points, so any two shapes can be morphed into each other by
 * interpolating point-by-point — no path-morphing dependency required.
 */

/** Number of points each shape is sampled at. */
export const LOADING_SHAPE_POINTS = 96;

/** A sampled shape: `LOADING_SHAPE_POINTS` radii, normalized so the largest is `1`. */
export type LoadingShape = number[];

type RadiusFn = (theta: number) => number;

const TAU = Math.PI * 2;

/** Radius of a regular `sides`-gon (circumradius 1), softened towards a circle. */
const roundedPolygon = (sides: number, softness: number): RadiusFn => {
  const segment = TAU / sides;
  const apothem = Math.cos(Math.PI / sides);
  return theta => {
    const phi = (((theta % segment) + segment) % segment) - segment / 2;
    const polygon = apothem / Math.cos(phi);
    return polygon * (1 - softness) + apothem * softness;
  };
};

/** Scalloped "cookie" / "burst" outline with `lobes` bumps. */
const scallop = (lobes: number, depth: number): RadiusFn =>
  theta => 1 - depth + depth * Math.cos(lobes * theta);

/** Superellipse rotated by `rotation` radians — used for the pill and oval. */
const superellipse = (a: number, b: number, exponent: number, rotation: number): RadiusFn =>
  theta => {
    const t = theta - rotation;
    const x = Math.abs(Math.cos(t) / a) ** exponent;
    const y = Math.abs(Math.sin(t) / b) ** exponent;
    return (x + y) ** (-1 / exponent);
  };

const sample = (fn: RadiusFn): LoadingShape => {
  const radii = Array.from({ length: LOADING_SHAPE_POINTS }, (_, i) =>
    fn((i / LOADING_SHAPE_POINTS) * TAU - Math.PI / 2)
  );
  const max = Math.max(...radii);
  return radii.map(r => r / max);
};

/**
 * The shape sequence of the M3 loading indicator:
 * soft burst → 9-sided cookie → pentagon → pill → sunny → 4-sided cookie → oval.
 */
export const LOADING_SHAPES: readonly LoadingShape[] = [
  sample(scallop(10, 0.07)),
  sample(scallop(9, 0.09)),
  sample(roundedPolygon(5, 0.35)),
  sample(superellipse(1, 0.58, 3, Math.PI / 4)),
  sample(scallop(8, 0.12)),
  sample(scallop(4, 0.13)),
  sample(superellipse(1, 0.72, 2, -Math.PI / 4)),
];

/** Linear, point-by-point interpolation between two shapes. */
export function interpolateShape(from: LoadingShape, to: LoadingShape, progress: number): LoadingShape {
  return from.map((r, i) => r + (to[i] - r) * progress);
}

/**
 * Converts a shape to an SVG path in a `0 0 100 100` view box, using a closed
 * Catmull-Rom spline through the sampled points so the outline stays smooth.
 */
export function shapeToPath(shape: LoadingShape): string {
  const n = shape.length;
  const points = shape.map((r, i) => {
    const theta = (i / n) * TAU - Math.PI / 2;
    return [50 + Math.cos(theta) * r * 50, 50 + Math.sin(theta) * r * 50];
  });
  const fmt = (v: number) => Number(v.toFixed(2));
  let d = `M${fmt(points[0][0])} ${fmt(points[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${fmt(c1x)} ${fmt(c1y)} ${fmt(c2x)} ${fmt(c2y)} ${fmt(p2[0])} ${fmt(p2[1])}`;
  }
  return d + 'Z';
}
