import React from "react"
import { useEffect, useState } from "react"

import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider, Page } from '@shopify/polaris';

import { fetchBookInfo } from "./api"
import useArray from "./hooks/useArray"
import useToggle from "./hooks/useToggle"
import ItemsScan from "./screens/ItemsScan";
import BookForm from "./components/BookForm"

import "./styles.css"
import { useInput } from "./hooks/useInput";


export default function App() {
  const { items, add } = useArray()
  const isbn = useInput()
  const title = useInput()
  const authors = useInput()
  const publishDate = useInput()
  const quantity = useInput(1)
  const [error, setError] = useState()
  const [scanning, toggleScanning] = useToggle()
  const [scanned, toggleScanned] = useToggle(true)

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

    let book = {
      isbn: isbn.value,
      title: title.value,
      authors: authors.value,
      publishDate: publishDate.value,
      quantity: quantity.value,
    }

    if (book.title && book.authors && book.publishDate) {
      add(book)
      setDefaultState()
    }
  }

  const setDefaultState = () => {
    isbn.reset()
    title.reset()
    authors.reset()
    publishDate.reset()
    quantity.reset()
  }

  useEffect(() => {
    if (isbn.value?.length >= 9) {
      setError(null)
      toggleScanning()
      fetchBookInfo(isbn.value)
        .then((data) => {
          title.set(data.title)
          authors.set(data.authors)
          publishDate.set(data.publishDate)
        })
        .catch(handleApiError)
        .then(toggleScanning)
    }
  }, [isbn.value])


  return (
    <AppProvider i18n={enTranslations}>
      <Page titleHidden>
        <ItemsScan />
        <BookForm open={scanned} onClose={toggleScanned} onSubmit={handleSubmit} isbn={isbn} title={title} authors={authors} publishDate={publishDate} quantity={quantity} add={true} />
      </Page>
    </AppProvider>
  )
}
