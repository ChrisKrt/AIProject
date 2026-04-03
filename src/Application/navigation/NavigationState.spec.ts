import { describe, it, expect, vi } from "vitest";
import { NavigationState } from "./NavigationState.js";
import {
  NavigationModule,
  DEFAULT_NAVIGATION_MODULE,
} from "./NavigationModule.js";
import { SidebarItem, DEFAULT_SIDEBAR_ITEM } from "./SidebarItem.js";

describe("NavigationState", () => {
  describe("initial state", () => {
    it("returns the default active module on construction", () => {
      const state = new NavigationState();

      expect(state.getActiveModule()).toBe(DEFAULT_NAVIGATION_MODULE);
    });

    it("returns the default active sidebar item on construction", () => {
      const state = new NavigationState();

      expect(state.getActiveSidebarItem()).toBe(DEFAULT_SIDEBAR_ITEM);
    });
  });

  describe("setActiveModule", () => {
    it("updates the active module to the new value", () => {
      const state = new NavigationState();

      state.setActiveModule(NavigationModule.OP_NEPTUNE);

      expect(state.getActiveModule()).toBe(NavigationModule.OP_NEPTUNE);
    });

    it("updates the active module across all NavigationModule values", () => {
      const state = new NavigationState();

      for (const module of Object.values(NavigationModule)) {
        state.setActiveModule(module);
        expect(state.getActiveModule()).toBe(module);
      }
    });

    it("notifies subscribers when the active module changes", () => {
      const state = new NavigationState();
      const callback = vi.fn();
      state.subscribe(callback);

      state.setActiveModule(NavigationModule.RECON_PHASE);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("does not notify subscribers when setting the same module", () => {
      const state = new NavigationState();
      const callback = vi.fn();
      state.subscribe(callback);

      state.setActiveModule(DEFAULT_NAVIGATION_MODULE);

      expect(callback).not.toHaveBeenCalled();
    });

    it("throws when given an invalid module value", () => {
      const state = new NavigationState();

      expect(() =>
        state.setActiveModule("INVALID_MODULE" as NavigationModule)
      ).toThrow();
    });
  });

  describe("setActiveSidebarItem", () => {
    it("updates the active sidebar item to the new value", () => {
      const state = new NavigationState();

      state.setActiveSidebarItem(SidebarItem.SIGINT);

      expect(state.getActiveSidebarItem()).toBe(SidebarItem.SIGINT);
    });

    it("updates independently from the active module", () => {
      const state = new NavigationState();

      state.setActiveModule(NavigationModule.RECON_PHASE);
      state.setActiveSidebarItem(SidebarItem.SIGINT);

      expect(state.getActiveModule()).toBe(NavigationModule.RECON_PHASE);
      expect(state.getActiveSidebarItem()).toBe(SidebarItem.SIGINT);
    });

    it("notifies subscribers when the sidebar item changes", () => {
      const state = new NavigationState();
      const callback = vi.fn();
      state.subscribe(callback);

      state.setActiveSidebarItem(SidebarItem.SIGINT);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("does not notify subscribers when setting the same sidebar item", () => {
      const state = new NavigationState();
      const callback = vi.fn();
      state.subscribe(callback);

      state.setActiveSidebarItem(DEFAULT_SIDEBAR_ITEM);

      expect(callback).not.toHaveBeenCalled();
    });

    it("throws when given an invalid sidebar item value", () => {
      const state = new NavigationState();

      expect(() =>
        state.setActiveSidebarItem("INVALID_ITEM" as SidebarItem)
      ).toThrow();
    });
  });

  describe("subscribe / unsubscribe", () => {
    it("notifies multiple subscribers independently", () => {
      const state = new NavigationState();
      const callbackA = vi.fn();
      const callbackB = vi.fn();
      state.subscribe(callbackA);
      state.subscribe(callbackB);

      state.setActiveModule(NavigationModule.OP_NEPTUNE);

      expect(callbackA).toHaveBeenCalledTimes(1);
      expect(callbackB).toHaveBeenCalledTimes(1);
    });

    it("stops notifying after unsubscribe is called", () => {
      const state = new NavigationState();
      const callback = vi.fn();
      const unsubscribe = state.subscribe(callback);

      unsubscribe();
      state.setActiveModule(NavigationModule.OP_NEPTUNE);

      expect(callback).not.toHaveBeenCalled();
    });

    it("calling unsubscribe twice does not throw", () => {
      const state = new NavigationState();
      const unsubscribe = state.subscribe(vi.fn());

      unsubscribe();

      expect(() => unsubscribe()).not.toThrow();
    });
  });
});
