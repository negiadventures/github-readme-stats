/**
 * Configuration constants for GitHub Readme Stats.
 *
 * Centralizes all configurable values used across the application,
 * including cache settings, API parameters, and rate limiting info.
 */

export const CONSTANTS = {
  // Cache duration in seconds
  CACHE_SECONDS: {
    DEFAULT: 14400, // 4 hours
    MIN: 14400, // 4 hours (minimum allowed)
    MAX: 86400, // 24 hours (maximum allowed)
  },

  // Card dimensions
  CARD: {
    DEFAULT_WIDTH: 500,
    MIN_WIDTH: 270,
    DEFAULT_BORDER_RADIUS: 4.5,
  },

  // Rank levels
  RANKS: {
    S_PLUS: "S+",
    S: "S",
    A_PLUS_PLUS: "A++",
    A_PLUS: "A+",
    B_PLUS: "B+",
  },

  // Top languages defaults
  LANGS: {
    DEFAULT_COUNT: 5,
    MIN_COUNT: 1,
    MAX_COUNT: 10,
  },

  // Available card layouts
  LAYOUTS: {
    DEFAULT: "default",
    COMPACT: "compact",
  },

  // WakaTime time ranges
  WAKATIME_RANGES: {
    LAST_7_DAYS: "last_7_days",
    LAST_30_DAYS: "last_30_days",
    LAST_6_MONTHS: "last_6_months",
    LAST_YEAR: "last_year",
    ALL_TIME: "all_time",
  },

  // Default theme name
  DEFAULT_THEME: "default",

  // Default locale
  DEFAULT_LOCALE: "en",
};
