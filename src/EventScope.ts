import { ON_OFF_SCOPE_APPEND } from './types';

/**
 * EventScope is a lightweight internal state manager
 * for toggling named boolean flags via event-driven updates.
 */
export class EventScope {
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
}
