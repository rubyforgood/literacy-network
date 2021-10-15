import { useCallback, useState } from "react"

import usePersistedState from "./usePersistedState"

export default function useScanningLog(initialValue = []) {
  const [items, setItems] = usePersistedState("literacy-network.scanning-log", initialValue)

  const add = useCallback((item) => {
    setItems((current) => [item, ...current]) // Order list by most recent
  }, [])

  return {
    add,
    items,
  }
}
