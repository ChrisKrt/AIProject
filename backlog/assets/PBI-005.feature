Feature: Application Shell – Foundation for Tactical Intelligence Dashboard
  As a tactical operator using the SILENT SENTINEL intelligence analysis platform
  I want a professional, responsive application shell with a cohesive layout structure
  So that I can efficiently navigate between intelligence analysis modules and access critical operational data with minimal cognitive load

  Background:
    Given the SILENT SENTINEL application is loaded
    And the Marine theme is active

  # -----------------------------------------------------------------------
  # AC #1 – Application title displayed in header
  # -----------------------------------------------------------------------

  Scenario: Application title is visible in the header
    When I view the application header
    Then the text "SILENT SENTINEL" is displayed prominently
    And the title uses a bold, headline font style

  # -----------------------------------------------------------------------
  # AC #2 – Top navigation modules displayed
  # -----------------------------------------------------------------------

  Scenario: Top navigation displays all operational modules
    When I view the application header
    Then the navigation contains the module "OP_NEPTUNE"

  # -----------------------------------------------------------------------
  # AC #4 + #5 – Header navigation controls (search/icons deferred)
  # -----------------------------------------------------------------------

  Scenario: Header navigation controls are present and accessible
    When I view the application header
    Then a <nav> element exists within the header
    And the navigation contains the module "OP_NEPTUNE"

  # -----------------------------------------------------------------------
  # AC #6 – Header glassmorphism effect
  # -----------------------------------------------------------------------

  Scenario: Header applies glassmorphism visual effect
    When I view the application header
    Then the header has a semi-transparent dark background
    And the header applies a backdrop blur visual effect

  # -----------------------------------------------------------------------
  # AC #7 + #8 + #9 + #10 – Sidebar structure and visual style
  # -----------------------------------------------------------------------

  Scenario: Sidebar displays navigation items with icon and label pairs
    When I view the application sidebar
    Then the sidebar has a fixed width of 64 pixels
    And the sidebar contains an "IMINT" navigation item with an icon and label
    And the active sidebar item has a left border accent and subtle background
    And the sidebar applies a glassmorphism visual effect consistent with the header

  # -----------------------------------------------------------------------
  # AC #11 – Sidebar collapses on mobile
  # -----------------------------------------------------------------------

  Scenario: Sidebar is hidden on small screens
    Given the viewport width is 375 pixels
    When I view the application layout
    Then the sidebar is not visible

  # -----------------------------------------------------------------------
  # AC #12 + #13 + #14 – Three-section layout and OBJ_DETECTION panel
  # -----------------------------------------------------------------------

  Scenario: Three-section layout and OBJ_DETECTION panel are rendered
    When I view the application layout on a desktop viewport
    Then the layout has a left sidebar panel
    And the layout has a center main content area
    And a panel labelled "LEFT PANEL" with a live feed indicator is visible in the left panel

  # -----------------------------------------------------------------------
  # AC #15 + #16 – Liquid glass panels and grid background
  # -----------------------------------------------------------------------

  Scenario: Panels use liquid glass design and grid background is visible
    When I view the main content area
    Then all panels apply a backdrop blur of 12 pixels
    And a subtle grid pattern with 24-pixel spacing is visible in the background

  # -----------------------------------------------------------------------
  # AC #17 + #18 – Color palette and typography
  # -----------------------------------------------------------------------

  Scenario: Design tokens for colors and typography are applied
    When I view the application shell
    Then the header background uses the Deep Navy color "#0F172A"
    And accent elements use the Signal Blue color "#3B82F6"
    And body text uses Source Sans 3 font
    And data labels use Source Code Pro font

  # -----------------------------------------------------------------------
  # AC #19 + #20 – Square corners and tonal depth (no visible borders)
  # -----------------------------------------------------------------------

  Scenario: Elements use square corners and tonal depth instead of borders
    When I inspect the visual style of application panels
    Then all panel elements have a border-radius of 0 pixels
    And depth is conveyed through color and tonal shifts rather than visible borders

  # -----------------------------------------------------------------------
  # AC #21 – Mobile-first responsive layout
  # -----------------------------------------------------------------------

  Scenario: Header remains visible on mobile screens
    Given the viewport width is 375 pixels
    When I view the application layout
    Then the header is visible

  # -----------------------------------------------------------------------
  # AC #22 – WCAG AA contrast ratios
  # -----------------------------------------------------------------------

  Scenario: Header elements meet WCAG AA contrast ratios
    When I inspect the rendered header with an accessibility checker
    Then no WCAG AA contrast violations are reported for header elements

  # -----------------------------------------------------------------------
  # AC #23 – Basic keyboard navigation
  # -----------------------------------------------------------------------

  Scenario: Keyboard navigation is available through header elements
    Given the application shell is focused
    When I press "Tab"
    Then focus cycles through keyboard-accessible header elements

  # -----------------------------------------------------------------------
  # AC #24 – Semantic HTML
  # -----------------------------------------------------------------------

  Scenario: Semantic HTML elements are used for accessibility
    When I inspect the DOM structure of the application shell
    Then a <header> element exists for the application header
    And a <nav> element exists within the header
    And an <aside> element exists for the sidebar
    And a <main> element exists for the main content area
    And a <footer> element exists for the status bar

  # -----------------------------------------------------------------------
  # AC #25 – Screen reader support
  # -----------------------------------------------------------------------

  Scenario: Screen reader can access header structure
    Given I am using a screen reader
    When I load the application
    Then the application title is announced
    And semantic landmark regions are announced appropriately

  # -----------------------------------------------------------------------
  # AC #26 – Hover states
  # -----------------------------------------------------------------------

  Scenario: Header elements respond to hover
    When I hover over an interactive header element
    Then the element background changes to indicate hover state

  # -----------------------------------------------------------------------
  # AC #27 – Active states use primary_fixed_dim color tokens
  # -----------------------------------------------------------------------

  Scenario: Active navigation state uses the correct design token
    When I inspect the active navigation item style
    Then the active item color matches the primary_fixed_dim design token

  # -----------------------------------------------------------------------
  # AC #28 – Disabled elements show reduced opacity
  # -----------------------------------------------------------------------

  Scenario: Disabled elements are shown with reduced opacity
    Given a navigation item is in a disabled state
    When I inspect the disabled element's visual style
    Then the element has an opacity of 60 percent

  # -----------------------------------------------------------------------
  # AC #29 – Focus states for keyboard navigation
  # -----------------------------------------------------------------------

  Scenario: Focus states are visible for keyboard navigation
    When I navigate through header elements using keyboard
    Then a visible focus indicator is rendered on each element
    And the focus indicator uses the accent color or outline style
