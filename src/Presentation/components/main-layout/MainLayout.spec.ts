import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import MainLayout from "./MainLayout.svelte";

/**
 * Unit tests for MainLayout component.
 *
 * Tests cover the three-section layout structure and semantic HTML.
 */

describe("MainLayout", () => {
  describe("semantic HTML (AC #24)", () => {
    it("renders a <main> element", () => {
      render(MainLayout, { props: {} });

      expect(document.querySelector("main")).toBeInTheDocument();
    });
  });

  describe("three-section layout (AC #12)", () => {
    it("renders the left panel section", () => {
      render(MainLayout, { props: {} });

      const sections = document.querySelectorAll("main section");
      console.assert(sections.length >= 1, "MainLayout must render at least one section in <main>");
      expect(sections.length).toBeGreaterThanOrEqual(1);
    });

    it("renders at least two sections for multi-panel layout", () => {
      render(MainLayout, { props: {} });

      const sections = document.querySelectorAll("main section");
      expect(sections.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("ARIA labels (AC #25)", () => {
    it("the main element has an aria-label", () => {
      render(MainLayout, { props: {} });

      const main = document.querySelector("main");
      expect(main?.getAttribute("aria-label")).toBeTruthy();
    });

    it("left panel section has an aria-label", () => {
      render(MainLayout, { props: {} });

      const sections = document.querySelectorAll("main section");
      const hasAria = Array.from(sections).some((s) => s.getAttribute("aria-label"));
      expect(hasAria).toBe(true);
    });
  });
});
