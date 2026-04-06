import { describe, it, expect, vi } from 'vitest';
import { MapState } from './MapState.js';
import { DEFAULT_MAP_VIEWPORT, type MapViewport } from './MapViewport.js';

const ALT_VIEWPORT: MapViewport = {
  center: [13.4, 52.5],
  zoom: 10,
  bearing: 45,
  pitch: 30,
};

describe('MapState', () => {
  describe('initial state', () => {
    it('returns DEFAULT_MAP_VIEWPORT on construction with no arguments', () => {
      const state = new MapState();

      expect(state.getViewport()).toEqual(DEFAULT_MAP_VIEWPORT);
    });

    it('returns the provided initial viewport when passed to the constructor', () => {
      const state = new MapState(ALT_VIEWPORT);

      expect(state.getViewport()).toEqual(ALT_VIEWPORT);
    });
  });

  describe('setViewport', () => {
    it('updates the viewport to the new value', () => {
      const state = new MapState();

      state.setViewport(ALT_VIEWPORT);

      expect(state.getViewport()).toEqual(ALT_VIEWPORT);
    });

    it('notifies subscribers when the viewport changes', () => {
      const state = new MapState();
      const callback = vi.fn();
      state.subscribe(callback);

      state.setViewport(ALT_VIEWPORT);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('does not notify subscribers when the viewport is identical', () => {
      const state = new MapState();
      const callback = vi.fn();
      state.subscribe(callback);

      state.setViewport(DEFAULT_MAP_VIEWPORT);

      expect(callback).not.toHaveBeenCalled();
    });

    it('does not notify when all viewport fields match exactly', () => {
      const state = new MapState(ALT_VIEWPORT);
      const callback = vi.fn();
      state.subscribe(callback);

      state.setViewport({ ...ALT_VIEWPORT });

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('flyTo', () => {
    it('updates the viewport', () => {
      const state = new MapState();

      state.flyTo(ALT_VIEWPORT);

      expect(state.getViewport()).toEqual(ALT_VIEWPORT);
    });

    it('notifies subscribers', () => {
      const state = new MapState();
      const callback = vi.fn();
      state.subscribe(callback);

      state.flyTo(ALT_VIEWPORT);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('does not notify when target viewport is identical to current', () => {
      const state = new MapState();
      const callback = vi.fn();
      state.subscribe(callback);

      state.flyTo(DEFAULT_MAP_VIEWPORT);

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('subscribe / unsubscribe', () => {
    it('notifies multiple subscribers independently', () => {
      const state = new MapState();
      const callbackA = vi.fn();
      const callbackB = vi.fn();
      state.subscribe(callbackA);
      state.subscribe(callbackB);

      state.setViewport(ALT_VIEWPORT);

      expect(callbackA).toHaveBeenCalledTimes(1);
      expect(callbackB).toHaveBeenCalledTimes(1);
    });

    it('stops notifying after unsubscribe is called', () => {
      const state = new MapState();
      const callback = vi.fn();
      const unsubscribe = state.subscribe(callback);

      unsubscribe();
      state.setViewport(ALT_VIEWPORT);

      expect(callback).not.toHaveBeenCalled();
    });

    it('calling unsubscribe twice does not throw', () => {
      const state = new MapState();
      const unsubscribe = state.subscribe(vi.fn());

      unsubscribe();

      expect(() => unsubscribe()).not.toThrow();
    });
  });

  describe('lifecycle no-ops', () => {
    it('mountMap does not throw', () => {
      const state = new MapState();

      expect(() => state.mountMap(document.createElement('div'), 'http://example.com')).not.toThrow();
    });

    it('disposeMap does not throw', () => {
      const state = new MapState();

      expect(() => state.disposeMap()).not.toThrow();
    });
  });

  describe('mouse position (no-ops)', () => {
    it('getMousePosition returns null', () => {
      // Arrange
      const state = new MapState();

      // Act
      const pos = state.getMousePosition();

      // Assert
      expect(pos).toBeNull();
    });

    it('subscribeMouseMove returns an unsubscribe function without throwing', () => {
      // Arrange
      const state = new MapState();
      const callback = vi.fn();

      // Act
      const unsubscribe = state.subscribeMouseMove(callback);
      state.setViewport(ALT_VIEWPORT); // changing viewport must NOT call the callback

      // Assert
      expect(callback).not.toHaveBeenCalled();
      expect(typeof unsubscribe).toBe('function');
      expect(() => unsubscribe()).not.toThrow();
    });
  });
});
