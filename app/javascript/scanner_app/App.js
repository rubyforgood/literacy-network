import React from "react"
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
  const [title, setTitle] = useState("")
  const [authors, setAuthors] = useState("")
  const [publishDate, setPublishDate] = useState("")
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

  const handleSubmit = (e) => {
    e.preventDefault()

    let book = { isbn, title, authors, publishDate }
    if (book.title && book.authors && book.publishDate) {
      add(book)
      setDefaultState()
    }
  }

  const setDefaultState = () => {
    setIsbn("")
    setTitle("")
    setAuthors("")
    setPublishDate("")
  }

  useEffect(() => {
    if (isbn?.length >= 9) {
      setError(null)
      toggleScanning()
      fetchBookInfo(isbn)
        .then((data) => {
          setTitle(data.title)
          setAuthors(data.authors)
          setPublishDate(data.publishDate)
        })
        .catch(handleApiError)
        .then(toggleScanning)
    }
  }, [isbn])

  return (
    <div className="App">
      <Scanner onScan={handleIsbnChange} />
      <form onSubmit={handleSubmit}>
        <label>
          ISBN:
          <input value={ isbn } onChange={e => handleIsbnChange(e.target.value)} />
        </label>
        <label>
          Title:
          <input value={ title } onChange={e => setTitle(e.target.value)} />
        </label>
        <label>
          Author(s):
          <input value={ authors } onChange={e => setAuthors(e.target.value)} />
        </label>
        <label>
          Publish Date:
          <input value={ publishDate } onChange={e => setPublishDate(e.target.value)} />
        </label>

        <input type="submit" />
      </form>

      <small>{error && error}</small>
      <p>{scanning && "Scanning Book..."}</p>

      <Books books={items} />
    </div>
  )
}
