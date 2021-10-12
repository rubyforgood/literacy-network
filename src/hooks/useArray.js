import { useCallback, useState } from "react"

import usePersistedState from "./usePersistedState"

export default function useArray(initialValue = []) {
  const [items, setItems] = usePersistedState("literacy-network.books", initialValue)

  const add = useCallback((item) => {
    setItems((current) => [...current, item])
  }, [])

  return {
    add,
    items
  }
}
