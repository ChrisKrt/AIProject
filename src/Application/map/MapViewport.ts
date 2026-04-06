/**
 * MapViewport – Immutable value object representing the map camera state.
 *
 * Encapsulates center coordinates, zoom level, bearing and pitch so that
 * the map state can be passed around as a single, testable unit.
 */
export interface MapViewport {
  /** Geographic center as [longitude, latitude]. */
  readonly center: readonly [number, number];
  /** Zoom level (0–22). */
  readonly zoom: number;
  /** Bearing in degrees (0–360). */
  readonly bearing: number;
  /** Pitch in degrees (0–60). */
  readonly pitch: number;
}

/**
 * Default viewport centred on Central Europe (lng 9, lat 51, zoom 5).
 * Used as a fallback when no initial viewport is provided to MapState.
 */
export const DEFAULT_MAP_VIEWPORT: MapViewport = {
  center: [9, 51],
  zoom: 5,
  bearing: 0,
  pitch: 0,
};
