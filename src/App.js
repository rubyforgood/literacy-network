import { useEffect, useState } from "react"

import { fetchBookInfo } from "./api"
import Books from "./components/Books"
import Scanner from "./components/Scanner"
import useArray from "./hooks/useArray"
import useToggle from "./hooks/useToggle"

import "./styles.css"

export default function App() {
  const { items, add } = useArray()
  const [isbn, setIsbn] = useState("")
  const [error, setError] = useState()
  const [scanning, toggleScanning] = useToggle()
  const handleApiError = (error) => {
    console.error(error)
    setError(`Could not find information for book #${isbn}`)
  }

  const handleIsbnChange = isbn => {
    setError(null)
    setIsbn(isbn)
  }

  useEffect(() => {
    if (isbn?.length >= 9) {
      setError(null)
      toggleScanning()
      fetchBookInfo(isbn)
        .then(add)
        .catch(handleApiError)
        .then(toggleScanning)
    }
  }, [isbn])

  return (
    <div className="App">
      <Scanner onScan={handleIsbnChange} />
      <input value={ isbn } onChange={e => handleIsbnChange(e.target.value)} />
      <small>{error && error}</small>
      <p>{scanning && "Scanning Book..."}</p>

      <Books books={items} />
    </div>
  )
}
