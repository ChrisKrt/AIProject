import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import BottomStatusBar from "./BottomStatusBar.svelte";

/**
 * Unit tests for BottomStatusBar component.
 *
 * Tests cover the footer element rendering and ARIA label.
 */

describe("BottomStatusBar", () => {
  describe("semantic HTML (AC #24)", () => {
    it("renders a <footer> element", () => {
      render(BottomStatusBar, { props: {} });

      expect(document.querySelector("footer")).toBeInTheDocument();
    });

    it("the footer has an aria-label attribute", () => {
      render(BottomStatusBar, { props: {} });

      const footer = document.querySelector("footer");
      expect(footer?.getAttribute("aria-label")).toBeTruthy();
    });
  });

  describe("CSS class prop", () => {
    it("applies an additional CSS class when provided", () => {
      render(BottomStatusBar, { props: { class: "test-class" } });

      const footer = document.querySelector("footer");
      expect(footer?.className).toContain("test-class");
    });
  });
});
