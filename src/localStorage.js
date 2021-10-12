/**
 * Looks up an entry from local storage based on the given key.
 *
 * Returns the provide `defaultValue` in case the entry
 * does not exist or the look up fails.
 */
 export function loadFromStorage(key, defaultValue) {
  try {
    return JSON.parse(window.localStorage.getItem(key)) || defaultValue
  } catch (e) {
    console.error(e)
    return defaultValue
  }
}

/**
 * Updates a local storage entry with a new value.
 */
export function updateStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error(e)
  }
}
