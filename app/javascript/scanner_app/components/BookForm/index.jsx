import React from "react"
import {
  Form,
  FormLayout,
  Modal,
  TextField,
  TextStyle
} from "@shopify/polaris"

import useInput from "../../hooks/useInput"
import axios from "axios"

export default function BookForm({
  book = {},
  onClose = () => {},
}) {

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

  const handleSubmit = async () => {
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
    // TODO: if `existingBook` then call PUT endpoint else call POST

    console.log("token", window.sessionToken)
    const response = await axios.post("/books", bookInfo, { headers: { "Authorization": "Bearer " + window.sessionToken } })

    // TODO: Close the modal upon a successful API response
    onClose()
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={title}
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
        <TextStyle variation="subdued">{subtitle}</TextStyle>
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
