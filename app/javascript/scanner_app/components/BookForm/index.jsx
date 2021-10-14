import React from "react"

import { Button, ButtonGroup, Card, Form, FormLayout, TextField, TextStyle } from "@shopify/polaris"

import "@shopify/polaris/build/esm/styles.css"

export default function BookForm(props) {
  return (
    <Card title="New Item Details" sectioned>
      <TextStyle variation="subdued">This is a new item that will be created</TextStyle>
      <Form onSubmit={props.onSubmit}>
        <FormLayout>
          <TextField label="ISBN #" {...props.isbn} />
          <TextField label="Title" {...props.title} />
          <TextField label="Author" {...props.authors} />
          <TextField label="Publish Date" {...props.publishDate} />
          <TextField label="Quantity" type="number" {...props.quantity} />
          <ButtonGroup>
            <Button>Cancel</Button>
            <Button primary submit>Save</Button>
          </ButtonGroup>
        </FormLayout>
      </Form>
    </Card>
  );
}
