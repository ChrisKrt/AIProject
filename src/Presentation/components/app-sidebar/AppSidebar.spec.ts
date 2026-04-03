import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/svelte";
import AppSidebar from "./AppSidebar.svelte";
import { NavigationModule } from "../../../Application/navigation/NavigationModule.js";
import { SidebarItem } from "../../../Application/navigation/SidebarItem.js";
import type { INavigationPort } from "../../../Application/ports/INavigationPort.js";

/**
 * Unit tests for AppSidebar component.
 *
 * Tests cover sidebar structure, navigation items, and ARIA attributes.
 */

function createNavigationPortMock(activeSidebarItem = SidebarItem.IMINT): INavigationPort {
  return {
    getActiveModule: vi.fn().mockReturnValue(NavigationModule.IMINT_ANALYSIS),
    setActiveModule: vi.fn(),
    getActiveSidebarItem: vi.fn().mockReturnValue(activeSidebarItem),
    setActiveSidebarItem: vi.fn(),
    subscribe: vi.fn().mockReturnValue(() => {}),
  };
}

describe("AppSidebar", () => {
  let navigationPort: INavigationPort;

  beforeEach(() => {
    navigationPort = createNavigationPortMock();
  });

  describe("semantic HTML (AC #24)", () => {
    it("renders an <aside> element", () => {
      render(AppSidebar, { props: { navigationPort } });

      expect(document.querySelector("aside")).toBeInTheDocument();
    });
  });

  describe("sidebar navigation items (AC #8)", () => {
    it("renders the IMINT sidebar navigation item", () => {
      render(AppSidebar, { props: { navigationPort } });

      const aside = document.querySelector("aside");
      console.assert(aside !== null, "AppSidebar must render an <aside> element");
      expect(aside?.textContent).toContain("IMINT");
    });
  });

  describe("active state (AC #9)", () => {
    it("marks the active sidebar item with aria-current", () => {
      render(AppSidebar, { props: { navigationPort } });

      const activeSidebarItem = document.querySelector("aside [aria-current='true']");
      expect(activeSidebarItem).toBeInTheDocument();
    });
  });

  describe("navigation port integration", () => {
    it("calls subscribe on the navigation port after render", () => {
      render(AppSidebar, { props: { navigationPort } });

      expect(navigationPort.subscribe).toHaveBeenCalledOnce();
    });

    it("reads the active sidebar item from the navigation port", () => {
      render(AppSidebar, { props: { navigationPort } });

      expect(navigationPort.getActiveSidebarItem).toHaveBeenCalled();
    });
  });
});
