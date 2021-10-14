import React from "react"

import { Form, FormLayout, Modal, TextField, TextStyle } from "@shopify/polaris"

import "@shopify/polaris/build/esm/styles.css"

export default function BookForm(props) {
  const add = props.add
  const title = add ? "New Item Details" : "Update Item Quantity"
  const subtitle = add ? "This is a new item that will be created." : "Item already exists. Please update quantity."

  return (
    <Modal open={props.open}
      onClose={props.onClose}
      title={title}
      primaryAction={{
        content: 'Save',
        onAction: props.onSubmit,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: props.onClose,
        },
      ]}
    >
      <Modal.Section>
        <TextStyle variation="subdued">{subtitle}</TextStyle>
        <Form>
          <FormLayout>
            <TextField label="ISBN #" {...props.isbn} disabled={!add} />
            <TextField label="Title" {...props.title} disabled={!add}/>
            <TextField label="Author" {...props.authors} disabled={!add}/>
            <TextField label="Publish Date" {...props.publishDate} disabled={!add} />
            <TextField label="Subject" {...props.subject} disabled={!add} />
            <TextField label="Price" type="number" {...props.price} disabled={!add} />
            <TextField label="Quantity" type="number" {...props.quantity} />
          </FormLayout>
        </Form>
      </Modal.Section>
    </Modal>
  );
}
