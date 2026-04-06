import type { IMapPort } from '../../Application/ports/IMapPort.js';
import type { MapViewport } from '../../Application/map/MapViewport.js';
import maplibregl from 'maplibre-gl';

/** BroadcastChannel name for cross-tab map sync (ADR-023). */
const MAP_CHANNEL_NAME = 'sentinel:map';

/** Message shape sent over the BroadcastChannel. */
interface MapMessage {
  type: 'viewport';
  value: MapViewport;
}

/**
 * MapLibreAdapter – Infrastructure adapter wrapping MapLibre GL JS.
 *
 * Implements IMapPort by delegating state reads/writes to the application
 * core's MapState. Additionally:
 * - Mounts a real MapLibre GL map into a DOM container (mountMap)
 * - Syncs viewport changes across browser tabs via BroadcastChannel (ADR-023)
 * - Tears down all resources cleanly (disposeMap)
 *
 * All maplibre-gl interactions are wrapped in try-catch to degrade gracefully
 * in environments where the library is unavailable (e.g. SSR, unit tests).
 * This is the ONLY file in the codebase that imports maplibre-gl directly.
 */
export class MapLibreAdapter implements IMapPort {
  private readonly _port: IMapPort;
  private _map: maplibregl.Map | null = null;
  private _channel: BroadcastChannel | null = null;
  private _unsubscribe: (() => void) | null = null;

  constructor(port: IMapPort) {
    if (!port) throw new Error('MapLibreAdapter requires a valid IMapPort.');
    this._port = port;
    this._initChannel();
    this._unsubscribe = this._port.subscribe(() => this._broadcastCurrentState());
  }

  /** Return the current map viewport. */
  getViewport(): MapViewport {
    return this._port.getViewport();
  }

  /** Update the viewport in the application state. */
  setViewport(viewport: MapViewport): void {
    this._port.setViewport(viewport);
  }

  /** Animate the map to the given viewport and update application state. */
  flyTo(viewport: MapViewport): void {
    this._port.flyTo(viewport);
    if (this._map) {
      try {
        this._map.flyTo({
          center: viewport.center as [number, number],
          zoom: viewport.zoom,
          bearing: viewport.bearing,
          pitch: viewport.pitch,
        });
      } catch {
        // Ignore map errors
      }
    }
  }

  /**
   * Subscribe to viewport changes.
   * Returns an unsubscribe function.
   */
  subscribe(callback: () => void): () => void {
    return this._port.subscribe(callback);
  }

  /**
   * Mount a MapLibre GL map into the given container element.
   * Implements IMapPort.mountMap.
   */
  mountMap(container: HTMLElement, styleUrl: string): void {
    try {
      this._map = new maplibregl.Map({
        container,
        style: styleUrl,
        center: this._port.getViewport().center as [number, number],
        zoom: this._port.getViewport().zoom,
        bearing: this._port.getViewport().bearing,
        pitch: this._port.getViewport().pitch,
        attributionControl: false,
      });
      this._map.addControl(
        new maplibregl.AttributionControl({ compact: false }),
        'bottom-right',
      );
      this._map.addControl(
        new maplibregl.NavigationControl({ showCompass: true }),
        'top-right',
      );
      this._map.on('move', () => {
        try {
          const center = this._map!.getCenter();
          this._port.setViewport({
            center: [center.lng, center.lat],
            zoom: this._map!.getZoom(),
            bearing: this._map!.getBearing(),
            pitch: this._map!.getPitch(),
          });
        } catch {
          // Ignore move errors
        }
      });
    } catch {
      // maplibre-gl may be unavailable; degrade gracefully
    }
  }

  /**
   * Unmount the map and release all resources.
   * Implements IMapPort.disposeMap.
   */
  disposeMap(): void {
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
    if (this._map) {
      try {
        this._map.remove();
      } catch {
        // Ignore removal errors
      }
      this._map = null;
    }
    if (this._channel) {
      try {
        this._channel.close();
      } catch {
        // Ignore close errors
      }
      this._channel = null;
    }
  }

  private _initChannel(): void {
    try {
      this._channel = new BroadcastChannel(MAP_CHANNEL_NAME);
      this._channel.addEventListener('message', this._onMessage.bind(this));
    } catch {
      this._channel = null;
    }
  }

  private _onMessage(event: MessageEvent<MapMessage>): void {
    const { type, value } = event.data;
    try {
      if (type === 'viewport') {
        this._port.setViewport(value);
      }
    } catch {
      // Ignore malformed messages
    }
  }

  private _broadcastCurrentState(): void {
    if (!this._channel) return;
    try {
      this._channel.postMessage({
        type: 'viewport',
        value: this._port.getViewport(),
      } satisfies MapMessage);
    } catch {
      // Ignore broadcast errors
    }
  }
}
