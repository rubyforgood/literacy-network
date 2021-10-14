import React from "react"

import { Button, ButtonGroup, Form, FormLayout, Modal, TextField, TextStyle } from "@shopify/polaris"

import "@shopify/polaris/build/esm/styles.css"

export default function BookForm(props) {
  const add = props.add
  const title = add ? "New Item Details" : "Update Item Quantity"
  const subtitle = add ? "This is a new item that will be created." : "Item already exists. Please update quantity."

  return (
    <Modal open={props.open} title={title} onClose={props.onClose}>
      <Modal.Section>
        <TextStyle variation="subdued">{subtitle}</TextStyle>
        <Form onSubmit={props.onSubmit}>
          <FormLayout>
            <TextField label="ISBN #" {...props.isbn} disabled={!add} />
            <TextField label="Title" {...props.title} disabled={!add}/>
            <TextField label="Author" {...props.authors} disabled={!add}/>
            <TextField label="Publish Date" {...props.publishDate} disabled={!add} />
            <TextField label="Subject" disabled={!add} />
            <TextField label="Price" disabled={!add} />
            <TextField label="Quantity" type="number" {...props.quantity} />
            <ButtonGroup>
              <Button>Cancel</Button>
              <Button primary submit>Save</Button>
            </ButtonGroup>
          </FormLayout>
        </Form>
      </Modal.Section>
    </Modal>
  );
}
