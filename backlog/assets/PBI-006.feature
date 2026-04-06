Feature: PBI-006 Background Map – Geographic Intelligence Layer

  As an intelligence analyst
  I want a full-screen interactive map in the center section of the application
  So that I can geospatially contextualise tactical data in real time

  Background:
    Given the SILENT SENTINEL application is open

  # AC #1 – Map renders in center section
  Scenario: Map renders in the center content area
    When the application has loaded
    Then the center section contains an element with aria-label "Tactical Map"

  # AC #2 – OSM raster tiles background
  Scenario: OSM-based tile style is loaded
    When the map has initialised
    Then the map tile style URL contains "cartocdn.com" or "openstreetmap.org"

  # AC #3 – Dark/light theme tile styles
  Scenario: Dark theme map style is applied when the OS is in dark mode
    Given the operating system colour scheme is dark
    When the map has initialised
    Then the tile style URL contains "dark-matter"

  Scenario: Light theme map style is applied when the OS is in light mode
    Given the operating system colour scheme is light
    When the map has initialised
    Then the tile style URL contains "positron"

  # AC #4 – Pan interaction
  Scenario: User can pan the map by dragging
    Given the map is visible
    When the user drags the map canvas
    Then the map centre coordinates change

  # AC #5 – Zoom interaction
  Scenario: User can zoom the map using the scroll wheel
    Given the map is visible
    When the user scrolls up on the map canvas
    Then the map zoom level increases

  # AC #6 – Keyboard navigation
  Scenario: User can pan the map using keyboard arrow keys
    Given the map container has keyboard focus
    When the user presses the right arrow key
    Then the map pans to the east

  # AC #7 – Control buttons with 0px border-radius (ADR-012)
  Scenario: Navigation control buttons have square corners
    When the map has initialised
    Then all ".maplibregl-ctrl-group" elements have border-radius "0px"

  # AC #9 – Accessible ARIA attributes
  Scenario: Map container has correct ARIA attributes
    When the map has initialised
    Then an element with aria-label "Tactical Map" exists in the DOM
    And that element has role "application"

  # AC #10 – Coordinates in BottomStatusBar
  Scenario: Current map coordinates are displayed in the status bar
    Given the map centre is at longitude 9.0000 and latitude 51.0000
    When the map has loaded
    Then the bottom status bar contains text matching "9.0000° E"
    And the bottom status bar contains text matching "51.0000° N"

  Scenario: Coordinates update when the map is panned
    Given the map is at the default centre
    When the user pans the map to a new location
    Then the bottom status bar coordinates reflect the new map centre

  # AC #11 – Default center/zoom
  Scenario: Map opens at the default centre and zoom
    When the application has loaded with no saved viewport
    Then the map centre is approximately longitude 9 and latitude 51
    And the map zoom level is 5

  # AC #15 – Fills full content area
  Scenario: MapView fills the full center content section
    When the map has initialised
    Then the map container element has CSS width "100%" and height "100%"

  # AC #17 – Attribution text visible
  Scenario: Map attribution is displayed
    When the map has initialised
    Then an attribution control is present in the bottom-right corner of the map

  # AC #18 – Focus outlines visible on map controls
  Scenario: Map control buttons show a focus ring on keyboard focus
    Given the map has initialised
    When a map control button receives keyboard focus
    Then the button displays a visible focus outline using the accent colour token
