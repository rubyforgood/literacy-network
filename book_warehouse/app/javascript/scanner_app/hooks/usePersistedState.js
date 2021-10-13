import { useEffect, useMemo, useState } from "react"

import { loadFromStorage, updateStorage } from "../localStorage"

/**
 * Provides a version of `useState` backed by LocalStorage
 * in order to provide persistence capabilities across browser
 * refreshes.
 *
 * State is automatically initialized from LocalStorage based
 * on the provided `key`.
 *
 * Whenever the state changes, the LocalStorage entry is updated
 * with the new value.
 */
export default function usePersistedState(key, initialValue) {
  const [value, setValue] = useState(loadFromStorage(key, initialValue))

  useEffect(() => updateStorage(key, value), [key, value])

  return useMemo(() => [value, setValue], [value, setValue])
}
