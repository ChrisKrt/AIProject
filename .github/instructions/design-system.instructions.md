# Design System Requirements


## Documnentation Guidelines
When documenting UI components or design elements:
- Include accessibility considerations and axe-core testing requirements
- Document theme support (light/dark) and responsive behavior
- Include visual examples or screenshots when documenting UI elements


## Implementation Guidelines
- There must be a clear separation between design tokens (colors, typography, spacing) and component styles.
- Design tokens should be defined in CSS custom properties and organized by theme.
- The theme selection is based on the browser settings.
- Colors must meet WCAG AA contrast requirements for accessibility.
- Colors and Design Tokens are saved in separate files. Colors are plain CSS variables, while Design Tokens are organized by theme and include references to the color variables. 
- Design tokens are named according to their purpose (e.g., `--color-primary`, `--spacing-small`) and are used in component styles to ensure consistency and maintainability.