# Design System Specification: Tactical Operational Interface

## 1. Overview & Creative North Star: "The Kinetic Grid"
This design system is engineered for high-stakes, data-dense environments where clarity and rapid cognition are mission-critical. Our Creative North Star is **"The Kinetic Grid"**—a philosophy that treats the UI as a living, modular command center rather than a static application. 

By moving away from "standard" rounded UI kits, we embrace a **Brutalist Precision** aesthetic. We break the template look through:
*   **Absolute Squareness:** A strict 0px radius policy that implies structural integrity and military-grade hardware.
*   **High-Density Modularization:** Borrowing the information architecture of modern IDEs (like VS Code), we prioritize data throughput over "empty" whitespace.
*   **Tonal Architecture:** Using color shifts rather than lines to define boundaries, creating a sophisticated, layered environment that feels deeply integrated.

---

## 2. Colors & Environmental Themes
The system utilizes four distinct tactical palettes designed for specific operational theaters. Each theme must strictly adhere to the Material Design token mapping provided.

### Tactical Themes
*   **Bundeswehr Heer (Default):** A forest/earth-toned palette optimized for standard field operations.
*   **Marine:** A deep navy high-intensity dark mode for low-light CIC (Combat Information Center) environments.
*   **Arktis:** A high-visibility ice-blue/white light mode for extreme cold-climate visibility.
*   **Wüste:** A sand-based tactical theme for arid environment operations.

### The "No-Line" Rule
Traditional 1px borders are strictly prohibited for sectioning. Structural definition must be achieved through:
*   **Background Shifts:** Use `surface_container_low` against a `surface` background to define a sidebar.
*   **Tonal Transitions:** Separate the header from the main content using `surface_container_highest`.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of plates. 
*   **Base:** `surface` (The foundation).
*   **Primary Modules:** `surface_container` (Information blocks).
*   **Sub-Modules:** `surface_container_low` or `surface_container_lowest` for inset data panels.
*   **Interaction Layers:** `surface_bright` for active/hover states.

### Glass & Gradient Rule
For floating HUD elements or modal overlays, use **Glassmorphism**. Apply a semi-transparent `surface_variant` with a high-value backdrop blur. To provide a "signature" polish, main Action Buttons should utilize a subtle linear gradient from `primary` to `primary_container` to simulate a backlit physical switch.

---

## 3. Typography: The Intelligence Hierarchy
We use a dual-typeface system to separate narrative command from raw data.

*   **Primary (Command): Source Sans 3.** Used for all UI labels, headers, and body text. It is highly legible at small scales and carries an authoritative, neutral tone.
*   **Secondary (Data): Source Code Pro.** Strictly for coordinates, timestamps, telemetry, and hex values. The monospaced nature ensures that fluctuating numbers do not cause layout "jitter."

### The Hierarchy
*   **Display (Display-LG/MD):** Used for large-scale status indicators (e.g., "SYSTEM CRITICAL"). 
*   **Headlines (Headline-SM):** Used for primary module titles. Must be uppercase with 0.05em tracking for a "stenciled" feel.
*   **Body (Body-MD):** Standard operational text.
*   **Labels (Label-SM):** Monospaced `Source Code Pro` for data fields.

---

## 4. Elevation & Depth: Tonal Layering
In a tactical environment, shadows are distractions. We define depth through color, not light.

*   **The Layering Principle:** Place a `surface_container_lowest` panel inside a `surface_container_high` module to create "recessed" data wells.
*   **Ambient Shadows:** Only used for floating Command Overlays. Shadows must be extra-diffused (32px-64px blur) at 6% opacity using the `surface_tint` color to maintain environmental harmony.
*   **The Ghost Border:** If high-contrast accessibility is required, use the `outline_variant` token at 15% opacity. Never use 100% opaque lines.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` background, `on_primary` text. Square corners (0px).
*   **Secondary:** `surface_container_high` background with a `primary` "Ghost Border."
*   **States:** On hover, shift to `primary_fixed_dim`. On active, shift to `primary_container`.

### Input Fields & Data Entries
*   **Styling:** Forgo the bottom-line-only style. Use a solid `surface_container_highest` background.
*   **Data Labels:** Always use `Label-SM` (Source Code Pro) positioned exactly `spacing-1` above the input.
*   **Error State:** Use `error` color for text and a 2px left-side accent bar instead of a full border.

### Tactical Cards & Lists
*   **No Dividers:** Separate list items using a `0.15rem` (spacing-1) gap of the parent background color.
*   **Density:** Use `spacing-2` for internal padding to maintain high information density.

### Additional Components: The "Status Ribbon"
A signature component for this system. A thin (spacing-0.5) horizontal bar at the top of any module using `tertiary` or `error` tokens to indicate the operational health of that specific data set.

---

## 6. Do’s and Don'ts

### Do:
*   **Maintain Density:** If there is too much "breathing room," increase the module count. This is a tool, not a marketing site.
*   **Use Monospacing for Numbers:** Always use `Source Code Pro` for values that change (clocks, GPS, counters).
*   **Align to the 0.15rem Grid:** Every element must snap to the spacing scale to maintain the "modular code" aesthetic.

### Don't:
*   **Don't Round Corners:** 0px is the absolute rule. Rounded corners break the "Tactical" visual metaphor.
*   **Don't Use Pure Black (#000):** Use `surface_container_lowest` for the darkest areas to maintain tonal depth.
*   **Don't Use Dividers:** If you feel the need for a line, use a background color shift or a `spacing-4` vertical gap instead.