import type { NavigationModule } from "../navigation/NavigationModule.js";
import type { SidebarItem } from "../navigation/SidebarItem.js";

/**
 * INavigationPort – Inbound port contract for navigation state management.
 *
 * Defines the operations the application core exposes for reading and
 * mutating navigation state. Adapters and UI components depend on this
 * interface, never on concrete implementations.
 */
export interface INavigationPort {
  /** Return the currently active top-level navigation module. */
  getActiveModule(): NavigationModule;

  /** Set the active top-level navigation module. */
  setActiveModule(module: NavigationModule): void;

  /** Return the currently active sidebar item. */
  getActiveSidebarItem(): SidebarItem;

  /** Set the active sidebar item. */
  setActiveSidebarItem(item: SidebarItem): void;

  /**
   * Subscribe to navigation state changes.
   * The callback is invoked whenever either the active module or sidebar
   * item changes. Returns an unsubscribe function.
   */
  subscribe(callback: () => void): () => void;
}
