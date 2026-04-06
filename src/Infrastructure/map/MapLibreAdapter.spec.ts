// NOTE: vi.mock and vi.stubGlobal calls must appear before the adapter import.
// Vitest hoists vi.mock() to the top of the module at compile time, so the
// mock is in place before any deferred ESM import resolves.
vi.mock('maplibre-gl', () => ({
  default: {
    Map: vi.fn(() => ({
      addControl: vi.fn(),
      on: vi.fn(),
      getCenter: vi.fn(() => ({ lng: 9, lat: 51 })),
      getZoom: vi.fn(() => 5),
      getBearing: vi.fn(() => 0),
      getPitch: vi.fn(() => 0),
      flyTo: vi.fn(),
      remove: vi.fn(),
    })),
    NavigationControl: vi.fn(),
    AttributionControl: vi.fn(),
  },
}));

// Mock BroadcastChannel before adapter import
const mockChannel = {
  addEventListener: vi.fn(),
  postMessage: vi.fn(),
  close: vi.fn(),
};
vi.stubGlobal('BroadcastChannel', vi.fn(() => mockChannel));

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MapLibreAdapter } from './MapLibreAdapter.js';
import { MapState } from '../../Application/map/MapState.js';
import type { MapViewport } from '../../Application/map/MapViewport.js';

const DEFAULT_VIEWPORT: MapViewport = { center: [9, 51], zoom: 5, bearing: 0, pitch: 0 };
const ALT_VIEWPORT: MapViewport = { center: [13.4, 52.5], zoom: 10, bearing: 45, pitch: 30 };

function createPort(): MapState {
  return new MapState(DEFAULT_VIEWPORT);
}

describe('MapLibreAdapter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('throws when port is null', () => {
      // Arrange / Act / Assert
      expect(() => new MapLibreAdapter(null as any)).toThrow(
        'MapLibreAdapter constructor requires a non-null IMapPort instance.',
      );
    });

    it('throws when port is undefined', () => {
      // Arrange / Act / Assert
      expect(() => new MapLibreAdapter(undefined as any)).toThrow(
        'MapLibreAdapter constructor requires a non-null IMapPort instance.',
      );
    });
  });

  describe('getViewport', () => {
    it('delegates to the underlying port', () => {
      // Arrange
      const port = createPort();
      const adapter = new MapLibreAdapter(port);

      // Act
      const viewport = adapter.getViewport();

      // Assert
      expect(viewport).toEqual(DEFAULT_VIEWPORT);
    });
  });

  describe('setViewport', () => {
    it('delegates to the underlying port', () => {
      // Arrange
      const port = createPort();
      const adapter = new MapLibreAdapter(port);

      // Act
      adapter.setViewport(ALT_VIEWPORT);

      // Assert
      expect(adapter.getViewport()).toEqual(ALT_VIEWPORT);
    });
  });

  describe('subscribe', () => {
    it('delegates to the underlying port and returns an unsubscribe function', () => {
      // Arrange
      const port = createPort();
      const adapter = new MapLibreAdapter(port);
      const callback = vi.fn();

      // Act
      const unsubscribe = adapter.subscribe(callback);
      adapter.setViewport(ALT_VIEWPORT);

      // Assert
      expect(callback).toHaveBeenCalledTimes(1);
      expect(typeof unsubscribe).toBe('function');
    });

    it('stops notifying after unsubscribe is called', () => {
      // Arrange
      const port = createPort();
      const adapter = new MapLibreAdapter(port);
      const callback = vi.fn();
      const unsubscribe = adapter.subscribe(callback);

      // Act
      unsubscribe();
      adapter.setViewport(ALT_VIEWPORT);

      // Assert
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('flyTo', () => {
    it('calls _port.flyTo when no map is mounted', () => {
      // Arrange
      const port = createPort();
      const adapter = new MapLibreAdapter(port);

      // Act
      adapter.flyTo(ALT_VIEWPORT);

      // Assert
      expect(adapter.getViewport()).toEqual(ALT_VIEWPORT);
    });

    it('calls _map.flyTo when a map instance exists', async () => {
      // Arrange
      const { default: maplibregl } = await import('maplibre-gl');
      const port = createPort();
      const adapter = new MapLibreAdapter(port);
      const container = document.createElement('div');
      adapter.mountMap(container, 'https://example.com/style.json');
      const mapInstance = (maplibregl.Map as ReturnType<typeof vi.fn>).mock.results[0].value;

      // Act
      adapter.flyTo(ALT_VIEWPORT);

      // Assert
      expect(mapInstance.flyTo).toHaveBeenCalledWith({
        center: ALT_VIEWPORT.center,
        zoom: ALT_VIEWPORT.zoom,
        bearing: ALT_VIEWPORT.bearing,
        pitch: ALT_VIEWPORT.pitch,
      });
    });
  });

  describe('_onMessage', () => {
    it('calls setViewport when receiving a valid viewport message', () => {
      // Arrange
      const port = createPort();
      const adapter = new MapLibreAdapter(port);
      const onMessage = mockChannel.addEventListener.mock.calls[0][1] as (
        event: MessageEvent,
      ) => void;

      // Act
      onMessage(new MessageEvent('message', { data: { type: 'viewport', value: ALT_VIEWPORT } }));

      // Assert
      expect(adapter.getViewport()).toEqual(ALT_VIEWPORT);
    });

    it('is silently ignored when data is null', () => {
      // Arrange
      const port = createPort();
      new MapLibreAdapter(port);
      const onMessage = mockChannel.addEventListener.mock.calls[0][1] as (
        event: MessageEvent,
      ) => void;

      // Act / Assert – must not throw
      expect(() =>
        onMessage(new MessageEvent('message', { data: null })),
      ).not.toThrow();
    });

    it('is silently ignored when type is not "viewport"', () => {
      // Arrange
      const port = createPort();
      const adapter = new MapLibreAdapter(port);
      const onMessage = mockChannel.addEventListener.mock.calls[0][1] as (
        event: MessageEvent,
      ) => void;

      // Act
      onMessage(new MessageEvent('message', { data: { type: 'other', value: ALT_VIEWPORT } }));

      // Assert – viewport unchanged
      expect(adapter.getViewport()).toEqual(DEFAULT_VIEWPORT);
    });
  });

  describe('disposeMap', () => {
    it('calls _map.remove() after mounting', async () => {
      // Arrange
      const { default: maplibregl } = await import('maplibre-gl');
      const port = createPort();
      const adapter = new MapLibreAdapter(port);
      const container = document.createElement('div');
      adapter.mountMap(container, 'https://example.com/style.json');
      const mapInstance = (maplibregl.Map as ReturnType<typeof vi.fn>).mock.results[0].value;

      // Act
      adapter.disposeMap();

      // Assert
      expect(mapInstance.remove).toHaveBeenCalledTimes(1);
    });

    it('closes the BroadcastChannel', () => {
      // Arrange
      const port = createPort();
      const adapter = new MapLibreAdapter(port);

      // Act
      adapter.disposeMap();

      // Assert
      expect(mockChannel.close).toHaveBeenCalledTimes(1);
    });
  });

  describe('mouse position', () => {
    it('getMousePosition returns null before any mousemove', () => {
      // Arrange
      const port = createPort();
      const adapter = new MapLibreAdapter(port);

      // Act / Assert
      expect(adapter.getMousePosition()).toBeNull();
    });

    it('getMousePosition returns coordinates after mousemove event', async () => {
      // Arrange
      const { default: maplibregl } = await import('maplibre-gl');
      const port = createPort();
      const adapter = new MapLibreAdapter(port);
      const container = document.createElement('div');
      adapter.mountMap(container, 'https://example.com/style.json');
      const mapInstance = (maplibregl.Map as ReturnType<typeof vi.fn>).mock.results[0].value;

      // Find the mousemove handler registered via map.on('mousemove', handler)
      const mousemoveCall = (mapInstance.on as ReturnType<typeof vi.fn>).mock.calls.find(
        (call: unknown[]) => call[0] === 'mousemove',
      );
      const mousemoveHandler = mousemoveCall?.[1] as ((e: { lngLat: { lng: number; lat: number } }) => void) | undefined;

      // Act
      mousemoveHandler?.({ lngLat: { lng: 13.4, lat: 52.5 } });

      // Assert
      expect(adapter.getMousePosition()).toEqual([13.4, 52.5]);
    });

    it('getMousePosition returns null after mouseout event', async () => {
      // Arrange
      const { default: maplibregl } = await import('maplibre-gl');
      const port = createPort();
      const adapter = new MapLibreAdapter(port);
      const container = document.createElement('div');
      adapter.mountMap(container, 'https://example.com/style.json');
      const mapInstance = (maplibregl.Map as ReturnType<typeof vi.fn>).mock.results[0].value;

      const mousemoveCall = (mapInstance.on as ReturnType<typeof vi.fn>).mock.calls.find(
        (call: unknown[]) => call[0] === 'mousemove',
      );
      const mousemoveHandler = mousemoveCall?.[1] as ((e: { lngLat: { lng: number; lat: number } }) => void) | undefined;
      mousemoveHandler?.({ lngLat: { lng: 13.4, lat: 52.5 } });

      const mouseoutCall = (mapInstance.on as ReturnType<typeof vi.fn>).mock.calls.find(
        (call: unknown[]) => call[0] === 'mouseout',
      );
      const mouseoutHandler = mouseoutCall?.[1] as (() => void) | undefined;

      // Act
      mouseoutHandler?.();

      // Assert
      expect(adapter.getMousePosition()).toBeNull();
    });

    it('subscribeMouseMove callback is invoked on mousemove', async () => {
      // Arrange
      const { default: maplibregl } = await import('maplibre-gl');
      const port = createPort();
      const adapter = new MapLibreAdapter(port);
      const container = document.createElement('div');
      adapter.mountMap(container, 'https://example.com/style.json');
      const mapInstance = (maplibregl.Map as ReturnType<typeof vi.fn>).mock.results[0].value;

      const callback = vi.fn();
      adapter.subscribeMouseMove(callback);

      const mousemoveCall = (mapInstance.on as ReturnType<typeof vi.fn>).mock.calls.find(
        (call: unknown[]) => call[0] === 'mousemove',
      );
      const mousemoveHandler = mousemoveCall?.[1] as ((e: { lngLat: { lng: number; lat: number } }) => void) | undefined;

      // Act
      mousemoveHandler?.({ lngLat: { lng: 13.4, lat: 52.5 } });

      // Assert
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('subscribeMouseMove unsubscribe stops notifications', async () => {
      // Arrange
      const { default: maplibregl } = await import('maplibre-gl');
      const port = createPort();
      const adapter = new MapLibreAdapter(port);
      const container = document.createElement('div');
      adapter.mountMap(container, 'https://example.com/style.json');
      const mapInstance = (maplibregl.Map as ReturnType<typeof vi.fn>).mock.results[0].value;

      const callback = vi.fn();
      const unsubscribe = adapter.subscribeMouseMove(callback);
      unsubscribe();

      const mousemoveCall = (mapInstance.on as ReturnType<typeof vi.fn>).mock.calls.find(
        (call: unknown[]) => call[0] === 'mousemove',
      );
      const mousemoveHandler = mousemoveCall?.[1] as ((e: { lngLat: { lng: number; lat: number } }) => void) | undefined;

      // Act
      mousemoveHandler?.({ lngLat: { lng: 13.4, lat: 52.5 } });

      // Assert
      expect(callback).not.toHaveBeenCalled();
    });

    it('disposeMap clears mouse position and subscribers', async () => {
      // Arrange
      const { default: maplibregl } = await import('maplibre-gl');
      const port = createPort();
      const adapter = new MapLibreAdapter(port);
      const container = document.createElement('div');
      adapter.mountMap(container, 'https://example.com/style.json');
      const mapInstance = (maplibregl.Map as ReturnType<typeof vi.fn>).mock.results[0].value;

      const callback = vi.fn();
      adapter.subscribeMouseMove(callback);

      const mousemoveCall = (mapInstance.on as ReturnType<typeof vi.fn>).mock.calls.find(
        (call: unknown[]) => call[0] === 'mousemove',
      );
      const mousemoveHandler = mousemoveCall?.[1] as ((e: { lngLat: { lng: number; lat: number } }) => void) | undefined;
      mousemoveHandler?.({ lngLat: { lng: 13.4, lat: 52.5 } });

      // Act
      adapter.disposeMap();

      // Assert
      expect(adapter.getMousePosition()).toBeNull();
    });
  });
});
