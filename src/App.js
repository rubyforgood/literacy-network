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
  const [author, setAuthor] = useState("")
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

    let book = { isbn, title, author, publishDate }
    if (book.title && book.author && book.publishDate) {
      add(book)
    }
  }

  useEffect(() => {
    if (isbn?.length >= 9) {
      setError(null)
      toggleScanning()
      fetchBookInfo(isbn)
        .then((data) => {
          setTitle(data.title)
          setAuthor(data.author)
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
          Author:
          <input value={ author } onChange={e => setAuthor(e.target.value)} />
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
