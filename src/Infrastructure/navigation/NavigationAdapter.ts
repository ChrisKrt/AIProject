import type { INavigationPort } from "../../Application/ports/INavigationPort.js";
import type { NavigationModule } from "../../Application/navigation/NavigationModule.js";
import type { SidebarItem } from "../../Application/navigation/SidebarItem.js";

/** BroadcastChannel name for cross-tab navigation sync (ADR-023). */
const NAVIGATION_CHANNEL_NAME = "sentinel:navigation";

/** Message shape sent over the BroadcastChannel. */
interface NavigationMessage {
  type: "module" | "sidebarItem";
  value: string;
}

/**
 * NavigationAdapter – Infrastructure adapter for cross-tab navigation sync.
 *
 * Wraps the application's INavigationPort and broadcasts state changes to all
 * other open tabs via the BroadcastChannel API (ADR-023). Also listens for
 * incoming messages and applies them to the shared state.
 *
 * This adapter is the only place in the codebase that interacts with
 * BroadcastChannel directly.
 */
export class NavigationAdapter {
  private readonly _port: INavigationPort;
  private _channel: BroadcastChannel | null = null;

  constructor(port: INavigationPort) {
    if (!port) {
      throw new Error("NavigationAdapter requires a valid INavigationPort.");
    }
    this._port = port;
    this._initChannel();
    this._port.subscribe(() => this._broadcastCurrentState());
  }

  /** Return the underlying navigation port for use by UI components. */
  getPort(): INavigationPort {
    return this._port;
  }

  /** Release BroadcastChannel resources. Call when the app is torn down. */
  dispose(): void {
    if (this._channel) {
      try {
        this._channel.close();
      } catch {
        // Ignore close errors
      }
      this._channel = null;
    }
  }

  private _initChannel(): void {
    try {
      this._channel = new BroadcastChannel(NAVIGATION_CHANNEL_NAME);
      this._channel.addEventListener(
        "message",
        this._onMessage.bind(this)
      );
    } catch {
      // BroadcastChannel may be unavailable in some environments; degrade gracefully.
      this._channel = null;
    }
  }

  private _onMessage(event: MessageEvent<NavigationMessage>): void {
    const { type, value } = event.data;
    try {
      if (type === "module") {
        this._port.setActiveModule(value as NavigationModule);
      } else if (type === "sidebarItem") {
        this._port.setActiveSidebarItem(value as SidebarItem);
      }
    } catch {
      // Ignore malformed broadcast messages
    }
  }

  private _broadcastCurrentState(): void {
    if (!this._channel) return;
    try {
      this._channel.postMessage({
        type: "module",
        value: this._port.getActiveModule(),
      } satisfies NavigationMessage);
      this._channel.postMessage({
        type: "sidebarItem",
        value: this._port.getActiveSidebarItem(),
      } satisfies NavigationMessage);
    } catch {
      // Ignore broadcast errors
    }
  }
}
