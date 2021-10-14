import React, { useState } from "react"
import { Button, Stack, ButtonGroup, TextField, DisplayText, Form } from '@shopify/polaris';

import "./styles.scss"
import { useInput } from "../hooks/useInput";
import { fetchBookInfo } from "../api";

export default function ItemsScan() {
  const isbn = useInput()
  
  const [bookInfo, setBookInfo] = useState()

  const handleSubmit= async () => {
    const info = await fetchBookInfo(isbn.value)
    setBookInfo(info)
  }

  return (
    <Form onSubmit={handleSubmit}>
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
            <code>{JSON.stringify(bookInfo, null, 2)}</code>
        </Stack>
      </div>
    </Form>
  )
}