import type { IMapPort } from '../ports/IMapPort.js';
import { type MapViewport, DEFAULT_MAP_VIEWPORT } from './MapViewport.js';

/**
 * MapState – Signal-based reactive map viewport state.
 *
 * Implements the IMapPort inbound port. Holds the current MapViewport and
 * notifies all registered subscribers on every state change. This class is
 * the single source of truth for map viewport within the application core.
 *
 * The mountMap and disposeMap lifecycle methods are no-ops here; the
 * Infrastructure adapter overrides them to wire up the real MapLibre GL map.
 */
export class MapState implements IMapPort {
  private _viewport: MapViewport;
  private readonly _subscribers = new Set<() => void>();

  /** Construct with an optional initial viewport (defaults to DEFAULT_MAP_VIEWPORT). */
  constructor(initialViewport: MapViewport = DEFAULT_MAP_VIEWPORT) {
    this._viewport = initialViewport;
  }

  /** Return the current map viewport. */
  getViewport(): MapViewport {
    return this._viewport;
  }

  /**
   * Update the viewport and notify subscribers.
   * Does not notify if the new viewport is identical to the current one.
   */
  setViewport(viewport: MapViewport): void {
    if (MapState._isEqual(this._viewport, viewport)) return;
    this._viewport = viewport;
    this._notifySubscribers();
  }

  /**
   * Animate to the given viewport and notify subscribers.
   * Uses the same state update as setViewport; animation is handled by
   * the infrastructure adapter.
   */
  flyTo(viewport: MapViewport): void {
    this.setViewport(viewport);
  }

  /**
   * Register a callback invoked on every state change.
   * @returns An unsubscribe function that removes the callback.
   */
  subscribe(callback: () => void): () => void {
    this._subscribers.add(callback);
    return () => {
      this._subscribers.delete(callback);
    };
  }

  /** No-op in the core layer; exists to satisfy the IMapPort contract.
   * The infrastructure adapter (MapLibreAdapter) overrides this to mount
   * the real MapLibre GL map renderer into the provided DOM container.
   */
  mountMap(_container: HTMLElement, _styleUrl: string): void {
    // no-op
  }

  /** No-op in the core layer; exists to satisfy the IMapPort contract.
   * The infrastructure adapter (MapLibreAdapter) overrides this to release
   * all map resources (renderer, BroadcastChannel, subscriptions).
   */
  disposeMap(): void {
    // no-op
  }

  private _notifySubscribers(): void {
    MapState._notifyAll(this._subscribers);
  }

  private static _notifyAll(subscribers: Set<() => void>): void {
    for (const subscriber of subscribers) {
      subscriber();
    }
  }

  private static _isEqual(a: MapViewport, b: MapViewport): boolean {
    return (
      a.center[0] === b.center[0] &&
      a.center[1] === b.center[1] &&
      a.zoom === b.zoom &&
      a.bearing === b.bearing &&
      a.pitch === b.pitch
    );
  }
}
