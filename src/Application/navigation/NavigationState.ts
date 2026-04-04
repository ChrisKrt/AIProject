import type { INavigationPort } from "../ports/INavigationPort.js";
import {
  NavigationModule,
  DEFAULT_NAVIGATION_MODULE,
} from "./NavigationModule.js";
import { SidebarItem, DEFAULT_SIDEBAR_ITEM } from "./SidebarItem.js";

/**
 * NavigationState – Signal-based reactive navigation state.
 *
 * Implements the INavigationPort inbound port. Holds the active module and
 * sidebar item and notifies all registered subscribers on every state change.
 * This class is the single source of truth for navigation within the
 * application core.
 */
export class NavigationState implements INavigationPort {
  private _activeModule: NavigationModule = DEFAULT_NAVIGATION_MODULE;
  private _activeSidebarItem: SidebarItem = DEFAULT_SIDEBAR_ITEM;
  private readonly _subscribers = new Set<() => void>();

  /** Return the currently active navigation module. */
  getActiveModule(): NavigationModule {
    return this._activeModule;
  }

  /**
   * Set the active navigation module and notify subscribers.
   * @throws {Error} When the provided module is not a valid NavigationModule.
   */
  setActiveModule(module: NavigationModule): void {
    if (!Object.values(NavigationModule).includes(module)) {
      throw new Error(
        `Invalid navigation module: "${module}". ` +
          `Valid values: ${Object.values(NavigationModule).join(", ")}`
      );
    }
    if (this._activeModule === module) return;
    this._activeModule = module;
    this._notifySubscribers();
  }

  /** Return the currently active sidebar item. */
  getActiveSidebarItem(): SidebarItem {
    return this._activeSidebarItem;
  }

  /**
   * Set the active sidebar item and notify subscribers.
   * @throws {Error} When the provided item is not a valid SidebarItem.
   */
  setActiveSidebarItem(item: SidebarItem): void {
    if (!Object.values(SidebarItem).includes(item)) {
      throw new Error(
        `Invalid sidebar item: "${item}". ` +
          `Valid values: ${Object.values(SidebarItem).join(", ")}`
      );
    }
    if (this._activeSidebarItem === item) return;
    this._activeSidebarItem = item;
    this._notifySubscribers();
  }

  /**
   * Register a callback invoked on every state change.
   * @returns An unsubscribe function that removes the callback.
   */
  subscribe(callback: () => void): () => void {
    this._subscribers.add(callback);
    return () => {
      this._subscribers.delete(callback);
    };
  }

  private static _notifyAll(subscribers: Set<() => void>): void {
    for (const subscriber of subscribers) {
      subscriber();
    }
  }

  private _notifySubscribers(): void {
    NavigationState._notifyAll(this._subscribers);
  }
}
