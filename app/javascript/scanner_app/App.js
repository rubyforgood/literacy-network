import React from "react"
import { useEffect, useState } from "react"

import { fetchBookInfo } from "./api"
import Books from "./components/Books"
import BookForm from "./components/BookForm"
import Scanner from "./components/Scanner"
import useArray from "./hooks/useArray"
import useToggle from "./hooks/useToggle"

import "./styles.css"
import "@shopify/polaris/build/esm/styles.css"

import enTranslations from "@shopify/polaris/locales/en.json"
import { AppProvider, Button, ButtonGroup, Card, Form, FormLayout, Page, TextField, TextStyle  } from "@shopify/polaris"

function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue)
  const onChange = setValue
  const reset = () => setValue(initialValue)
  return { value, onChange, reset, set: setValue }
}

export default function App() {
  const { items, add } = useArray()
  const isbn = useInput()
  const title = useInput()
  const authors = useInput()
  const publishDate = useInput()
  const quantity = useInput(1)
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
      <Page title="Example app updated">
        <div className="App">
          <Scanner onScan={handleIsbnChange} />

          {/* <BookForm onSubmit={handleSubmit} isbn={isbn} title={title} authors={authors} publishDate={publishDate} quantity={quantity} /> */}

          <Card title="New Item Details" sectioned>
            <TextStyle variation="subdued">This is a new item that will be created</TextStyle>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField label="ISBN #" {...isbn} />
                <TextField label="Title" {...title} />
                <TextField label="Author" {...authors} />
                <TextField label="Publish Date" {...publishDate} />
                <TextField label="Quantity" type="number" {...quantity} />
                <ButtonGroup>
                  <Button>Cancel</Button>
                  <Button primary submit>Save</Button>
                </ButtonGroup>
              </FormLayout>
            </Form>
          </Card>

          <small>{error && error}</small>
          <p>{scanning && "Scanning Book..."}</p>

          <Books books={items} />
        </div>
      </Page>
    </AppProvider>
  )
}
