import { useCallback, useState } from "react"

export default function useArray(initialValue = []) {
  const [items, setItems] = useState(initialValue)

  const add = useCallback((item) => {
    setItems((current) => [...current, item])
  }, [])

  return {
    add,
    items
  }
}
