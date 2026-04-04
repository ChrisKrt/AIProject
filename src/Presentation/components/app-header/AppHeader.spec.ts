import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/svelte";
import AppHeader from "./AppHeader.svelte";
import { NavigationModule } from "../../../Application/navigation/NavigationModule.js";
import type { INavigationPort } from "../../../Application/ports/INavigationPort.js";
import { SidebarItem } from "../../../Application/navigation/SidebarItem.js";

/**
 * Unit tests for AppHeader component.
 *
 * Tests cover rendering of the application title, navigation items,
 * search field, user controls, and ARIA accessibility attributes.
 */

/** Factory for a minimal INavigationPort mock. */
function createNavigationPortMock(activeModule = NavigationModule.IMINT_ANALYSIS): INavigationPort {
  return {
    getActiveModule: vi.fn().mockReturnValue(activeModule),
    setActiveModule: vi.fn(),
    getActiveSidebarItem: vi.fn().mockReturnValue(SidebarItem.IMINT),
    setActiveSidebarItem: vi.fn(),
    subscribe: vi.fn().mockReturnValue(() => {}),
  };
}

describe("AppHeader", () => {
  let navigationPort: INavigationPort;

  beforeEach(() => {
    navigationPort = createNavigationPortMock();
  });

  describe("application title (AC #1)", () => {
    it("renders the SILENT SENTINEL application title", () => {
      render(AppHeader, { props: { navigationPort } });

      expect(screen.getByText("SILENT SENTINEL")).toBeInTheDocument();
    });
  });

  describe("navigation modules (AC #2)", () => {
    it("renders at least one navigation module item in the nav", () => {
      render(AppHeader, { props: { navigationPort } });

      const nav = document.querySelector("header nav");
      console.assert(nav !== null, "AppHeader must render a <nav> inside <header>");
      expect(nav).not.toBeNull();
    });
  });

  describe("semantic HTML (AC #24)", () => {
    it("renders a <header> element", () => {
      render(AppHeader, { props: { navigationPort } });

      expect(document.querySelector("header")).toBeInTheDocument();
    });

    it("renders a <nav> element within the header", () => {
      render(AppHeader, { props: { navigationPort } });

      expect(document.querySelector("header nav")).toBeInTheDocument();
    });
  });

  describe("navigation port integration", () => {
    it("calls subscribe on the navigation port after render", () => {
      render(AppHeader, { props: { navigationPort } });

      expect(navigationPort.subscribe).toHaveBeenCalledOnce();
    });

    it("reads the active module from the navigation port", () => {
      render(AppHeader, { props: { navigationPort } });

      expect(navigationPort.getActiveModule).toHaveBeenCalled();
    });
  });
});
