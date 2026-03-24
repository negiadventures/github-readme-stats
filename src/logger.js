/**
 * Logger utility for GitHub Readme Stats.
 *
 * Provides structured logging with configurable log levels.
 * In production environments, debug logs are suppressed.
 */

const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
};

const currentLevel =
  process.env.NODE_ENV === "production" ? LOG_LEVELS.WARN : LOG_LEVELS.DEBUG;

/**
 * Formats a log message with a timestamp and level prefix.
 * @param {string} level - The log level label.
 * @param {string} message - The message to log.
 * @returns {string} Formatted log string.
 */
const format = (level, message) => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level}] ${message}`;
};

export const logger = {
  /**
   * Logs an error message.
   * @param {string} message
   * @param {Error} [error]
   */
  error(message, error) {
    if (currentLevel >= LOG_LEVELS.ERROR) {
      console.error(format("ERROR", message));
      if (error) console.error(error);
    }
  },

  /**
   * Logs a warning message.
   * @param {string} message
   */
  warn(message) {
    if (currentLevel >= LOG_LEVELS.WARN) {
      console.warn(format("WARN", message));
    }
  },

  /**
   * Logs an informational message.
   * @param {string} message
   */
  info(message) {
    if (currentLevel >= LOG_LEVELS.INFO) {
      console.info(format("INFO", message));
    }
  },

  /**
   * Logs a debug message (suppressed in production).
   * @param {string} message
   */
  debug(message) {
    if (currentLevel >= LOG_LEVELS.DEBUG) {
      console.debug(format("DEBUG", message));
    }
  },
};
