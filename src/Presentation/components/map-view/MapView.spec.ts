import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/svelte';

// Mock maplibre-gl before any imports that pull it in
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

import MapView from './MapView.svelte';
import type { IMapPort } from '../../../Application/ports/IMapPort.js';
import type { MapViewport } from '../../../Application/map/MapViewport.js';

const DEFAULT_VIEWPORT: MapViewport = {
  center: [9, 51],
  zoom: 5,
  bearing: 0,
  pitch: 0,
};

function createMockMapPort(): IMapPort {
  return {
    getViewport: vi.fn(() => DEFAULT_VIEWPORT),
    setViewport: vi.fn(),
    flyTo: vi.fn(),
    subscribe: vi.fn(() => vi.fn()),
    mountMap: vi.fn(),
    disposeMap: vi.fn(),
  };
}

describe('MapView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('accessibility (AC #9)', () => {
    it('renders a div with aria-label="Tactical Map"', () => {
      const mapPort = createMockMapPort();

      render(MapView, { props: { mapPort } });

      const el = document.querySelector('[aria-label="Tactical Map"]');
      expect(el).toBeInTheDocument();
    });

    it('renders a div with role="application"', () => {
      const mapPort = createMockMapPort();

      render(MapView, { props: { mapPort } });

      const el = document.querySelector('[role="application"]');
      expect(el).toBeInTheDocument();
    });
  });

  describe('lifecycle', () => {
    it('calls subscribe on the mapPort', () => {
      const mapPort = createMockMapPort();

      render(MapView, { props: { mapPort } });

      expect(mapPort.subscribe).toHaveBeenCalledTimes(1);
    });

    it('calls mountMap on the mapPort after mount', () => {
      const mapPort = createMockMapPort();

      render(MapView, { props: { mapPort } });

      expect(mapPort.mountMap).toHaveBeenCalledTimes(1);
    });

    it('passes a styleUrl to mountMap', () => {
      const mapPort = createMockMapPort();

      render(MapView, { props: { mapPort, styleUrl: 'https://example.com/style.json' } });

      expect(mapPort.mountMap).toHaveBeenCalledWith(
        expect.any(HTMLElement),
        'https://example.com/style.json',
      );
    });
  });
});
