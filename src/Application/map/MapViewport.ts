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
 * Default viewport read from environment variables, with safe fallbacks to
 * central Europe (lng 9, lat 51, zoom 5).
 */
export const DEFAULT_MAP_VIEWPORT: MapViewport = {
  center: [
    Number(import.meta.env['VITE_MAP_DEFAULT_LNG'] ?? 9),
    Number(import.meta.env['VITE_MAP_DEFAULT_LAT'] ?? 51),
  ],
  zoom: Number(import.meta.env['VITE_MAP_DEFAULT_ZOOM'] ?? 5),
  bearing: 0,
  pitch: 0,
};
