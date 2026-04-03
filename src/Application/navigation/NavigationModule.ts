/**
 * NavigationModule – Operational module identifiers for top navigation.
 *
 * Each value represents a primary mission module accessible from the
 * application header navigation bar.
 */
export enum NavigationModule {
  OP_NEPTUNE = "OP_NEPTUNE",
  IMINT_ANALYSIS = "IMINT_ANALYSIS",
  RECON_PHASE = "RECON_PHASE",
}

/** Default module shown on initial load. */
export const DEFAULT_NAVIGATION_MODULE = NavigationModule.IMINT_ANALYSIS;
