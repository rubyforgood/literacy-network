import React, { useState } from "react"
import {
  Button,
  Stack,
  ButtonGroup,
  TextField,
  DisplayText,
  Form,
} from '@shopify/polaris';

import BookForm from "../components/BookForm"

import { fetchBookInfo } from "../api";
import useInput from "../hooks/useInput";

import "./styles.scss"

export default function ItemsScan() {
  const isbn = useInput()
  const [bookInfo, setBookInfo] = useState()
  const formOpened = bookInfo != null

  const handleBookInfoFetch= async () => {
    const info = await fetchBookInfo(isbn.value)
    setBookInfo(info)
  }

  const handleCloseForm = () => {
    isbn.reset()
    setBookInfo(null)
  }

  return (
    <Form onSubmit={handleBookInfoFetch}>
      <div className="items-scan">
        <Stack vertical distribution="center" alignment="center">
          <DisplayText size="medium">Scan Items</DisplayText>
          <ButtonGroup segmented>
            <Button>New</Button>
            <Button>Used</Button>
          </ButtonGroup>
          <Stack spacing="none">
            <Stack.Item fill>
              <TextField {...isbn} name="isbn" placeholder="ISBN lookup" />
            </Stack.Item>
            <Button submit>Enter</Button>
          </Stack>

          {formOpened && (
            <BookForm
              isbn={isbn}
              book={bookInfo}
              onClose={handleCloseForm}
            />
          )}
        </Stack>
      </div>
    </Form>
  )
}
