/**
 * In-memory caching module for GitHub Readme Stats.
 *
 * Provides a simple TTL-based cache to reduce repeated API calls
 * and improve response performance.
 */

/**
 * @typedef {Object} CacheEntry
 * @property {*} data - The cached data.
 * @property {number} expiresAt - The expiry timestamp (ms since epoch).
 */

/** @type {Map<string, CacheEntry>} */
const store = new Map();

export const cache = {
  /**
   * Retrieves a value from the cache.
   * Returns `null` if the key does not exist or has expired.
   *
   * @param {string} key - Cache key.
   * @returns {*} The cached data, or `null` if not found/expired.
   */
  get(key) {
    const entry = store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      store.delete(key);
      return null;
    }
    return entry.data;
  },

  /**
   * Stores a value in the cache with a given TTL.
   *
   * @param {string} key - Cache key.
   * @param {*} data - Data to cache.
   * @param {number} [ttlSeconds=14400] - Time-to-live in seconds (default: 4 hours).
   */
  set(key, data, ttlSeconds = 14400) {
    store.set(key, {
      data,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  },

  /**
   * Removes a specific key from the cache.
   *
   * @param {string} key - Cache key.
   */
  invalidate(key) {
    store.delete(key);
  },

  /**
   * Clears all entries from the cache.
   */
  clear() {
    store.clear();
  },

  /**
   * Returns the number of entries currently in the cache.
   *
   * @returns {number}
   */
  size() {
    return store.size;
  },
};
