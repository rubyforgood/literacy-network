import React, { useState } from "react"
import {
  DisplayText,
  Form,
  FormLayout,
  Modal,
  TextField,
  TextStyle
} from "@shopify/polaris"

import useInput from "../../hooks/useInput"

import { createBook, updateBook } from "../../api";

export default function BookForm({
  book = {},
  onClose = () => {},
}) {

  const [error, setError] = useState()
  // Books having an id mean they already exist in Shopify"s DB.
  const existingBook = book.id != null
  const title = existingBook ? "Update Item Quantity" : "New Item Details"
  const subtitle = existingBook ? "Item already exists. Please update quantity." : "This is a new item that will be created."

  const bookIsbn = useInput(book.isbn)
  const bookTitle = useInput(book.title)
  const bookPrice = useInput(book.price || 0)
  const bookAuthors = useInput(book.authors)
  const bookSubject = useInput(book.subject)
  const bookPublishDate = useInput(book.publishDate)
  const quantity = useInput(book.quantity || 1)

  const handleError = () => {
    setError("There was an error saving your book.")
  }

  const handleSubmit = () => {
    const bookInfo = {
      id: book.id,
      isbn: book.isbn,
      title: bookTitle.value,
      price: bookPrice.value,
      author: bookAuthors.value,
      subject: bookSubject.value,
      publishDate: bookPublishDate.value,
      quantity: quantity.value,
    }

    const saveBookRequest = existingBook ? updateBook(bookInfo) : createBook(bookInfo)

    saveBookRequest
      .then((resp) => {
        if (resp.ok) {
          onClose()
        } else {
          handleError()
        }
      })
      .catch(() => {
        handleError()
      })
  }

  return (
    <Modal
      className="bookForm"
      open
      onClose={onClose}
      title={
        <>
          <DisplayText size="large">{title}</DisplayText>
          <TextStyle variation="subdued">{subtitle}</TextStyle>
          { error && (
            <div>
              <TextStyle variation="negative">{error}</TextStyle>
            </div>
          )}
        </>
      }
      primaryAction={{
        content: "Save",
        onAction: handleSubmit,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: onClose,
        },
      ]}
    >
      <Modal.Section>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField label="ISBN #" {...bookIsbn} disabled={existingBook} />
            <TextField label="Title" {...bookTitle} disabled={existingBook}/>
            <TextField label="Author" {...bookAuthors} disabled={existingBook}/>
            <TextField label="Publish Date" {...bookPublishDate} disabled={existingBook} />
            <TextField label="Subject" {...bookSubject} disabled={existingBook} />
            <TextField label="Price" type="number" {...bookPrice} disabled={existingBook} />
            <TextField label="Quantity" type="number" {...quantity} />
          </FormLayout>
        </Form>
      </Modal.Section>
    </Modal>
  );
}
