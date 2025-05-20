import { itemsMapType, ON_OFF_SCOPE_APPEND } from './types';

/**
 * EventToggleManager is a lightweight internal state manager
 * for toggling named boolean flags via event-driven updates.
 *
 * It stores toggle states (true/false) associated with unique names
 * and is typically used with a scoped event system to manage
 * UI component visibility (e.g. modals, drawers).
 */
export class EventToggleManager {
  /** Internal map of toggle states by name */
  items: itemsMapType = {};

  /** Unique hash identifier for the instance */
  hash;

  constructor() {
    // Generate a unique hash with suffix (used for debugging or namespacing)
    this.hash = `${this.generateHash()}_${ON_OFF_SCOPE_APPEND}`;
  }

  /**
   * Generates a random alphanumeric hash string.
   *
   * @param length Length of the generated hash string (default is 40).
   * @returns A random string composed of numbers and letters.
   */
  private generateHash(length = 40): string {
    const chars =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Adds one or more items to the internal toggle state map.
   *
   * @param params A key-value map of toggle names and their boolean values.
   */
  addItem(params: itemsMapType) {
    this.items = {
      ...this.items,
      ...params,
    };
  }

  /**
   * Retrieves the toggle state by its name.
   *
   * @param name The unique identifier for the toggle item.
   * @returns Boolean value indicating the current toggle state.
   */
  getItem(name: string) {
    return this.items[name];
  }

  /**
   * Updates the toggle state for a given name.
   *
   * @param name The name of the toggle item to update.
   * @param value The new boolean value to set.
   */
  updateStatus(name: string, value: boolean) {
    this.items[name] = value;
  }
}
