import type { MapViewport } from '../map/MapViewport.js';

/**
 * IMapPort – Inbound port contract for map viewport state management.
 *
 * Defines operations the application core exposes for reading and mutating
 * map state. Adapters and UI components depend on this interface, never on
 * concrete implementations (Ports & Adapters ADR-019).
 *
 * The optional mountMap / disposeMap lifecycle hooks allow the Infrastructure
 * adapter to mount the real MapLibre GL map into a DOM element without leaking
 * maplibre-gl types into the Application or Presentation layers.
 */
export interface IMapPort {
  /** Return the current map viewport. */
  getViewport(): MapViewport;

  /** Update the viewport and notify subscribers. */
  setViewport(viewport: MapViewport): void;

  /** Animate the map to the given viewport and notify subscribers. */
  flyTo(viewport: MapViewport): void;

  /**
   * Subscribe to viewport changes.
   * Returns an unsubscribe function.
   */
  subscribe(callback: () => void): () => void;

  /**
   * Return the current mouse cursor position as [lng, lat], or null when the
   * cursor is outside the map canvas. Updated by the infrastructure adapter
   * via `mousemove` / `mouseout` events; always null in the application core.
   */
  getMousePosition(): readonly [number, number] | null;

  /**
   * Subscribe to mouse-move events on the map canvas.
   * The callback is invoked whenever the cursor moves over the map or leaves it.
   * Returns an unsubscribe function.
   * No-op (returns empty unsubscribe) in the application core.
   */
  subscribeMouseMove(callback: () => void): () => void;

  /**
   * Mount the underlying map renderer into the given container element.
   * No-op in the application core; implemented by the infrastructure adapter.
   */
  mountMap(container: HTMLElement, styleUrl: string): void;

  /**
   * Release all map resources (renderer, channels, subscriptions).
   * No-op in the application core; implemented by the infrastructure adapter.
   */
  disposeMap(): void;
}
