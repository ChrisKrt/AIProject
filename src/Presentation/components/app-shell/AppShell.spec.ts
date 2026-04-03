import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import AppShell from "./AppShell.svelte";

/**
 * Unit tests for AppShell component.
 *
 * Tests cover that all structural regions are rendered and compose
 * the header, sidebar, main layout, and footer correctly.
 */

describe("AppShell", () => {
  describe("structural composition", () => {
    it("renders a <header> element", () => {
      render(AppShell);

      expect(document.querySelector("header")).toBeInTheDocument();
    });

    it("renders an <aside> element for the sidebar", () => {
      render(AppShell);

      expect(document.querySelector("aside")).toBeInTheDocument();
    });

    it("renders a <main> element for the content area", () => {
      render(AppShell);

      expect(document.querySelector("main")).toBeInTheDocument();
    });

    it("renders a <footer> element for the status bar", () => {
      render(AppShell);

      expect(document.querySelector("footer")).toBeInTheDocument();
    });
  });

  describe("application title (AC #1)", () => {
    it("displays SILENT SENTINEL in the header", () => {
      render(AppShell);

      const header = document.querySelector("header");
      console.assert(header !== null, "AppShell must render a header element");
      expect(header?.textContent).toContain("SILENT SENTINEL");
    });
  });

  describe("navigation accessibility (AC #23, #25)", () => {
    it("header contains a <nav> element", () => {
      render(AppShell);

      expect(document.querySelector("header nav")).toBeInTheDocument();
    });

    it("sidebar contains interactive items with aria-labels", () => {
      render(AppShell);

      // AppSidebar uses <wa-button> (WebAwesome component), so query any element
      // inside aside that carries an aria-label.
      const interactiveItems = document.querySelectorAll("aside [aria-label]");
      expect(interactiveItems.length).toBeGreaterThan(0);
    });
  });
});
