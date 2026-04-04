/**
 * SidebarItem – Identifiers for the primary vertical navigation sidebar items.
 *
 * Each value maps to a top-level intelligence discipline accessible
 * from the left-side icon navigation.
 */
export enum SidebarItem {
  IMINT = "IMINT",
  SIGINT = "SIGINT",
}

/** Default sidebar item shown on initial load. */
export const DEFAULT_SIDEBAR_ITEM = SidebarItem.IMINT;
