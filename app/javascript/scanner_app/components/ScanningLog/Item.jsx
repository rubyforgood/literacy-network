import React from "react"
import {
  Caption,
  Collapsible,
  Icon,
  Heading,
  Listbox,
  Stack
} from "@shopify/polaris"
import ArrowUp from "../icons/ArrowUp"
import ArrowDown from "../icons/ArrowDown"

const transition = {
  duration: "500ms",
  timingFunction: "ease-in-out",
}

export default function Item({ item, selected = false }) {
  return (
    <React.Fragment>
      <Listbox.Action value={ item.isbn } divider={ !selected }>
        <Stack vertical>
          <Heading>ISBN #</Heading><Caption>{ item.isbn }</Caption>
        </Stack>
        <Stack>
          <Icon source={ selected ? ArrowUp : ArrowDown } />
          <Heading>{ selected ? "Less" : "More" }</Heading>
        </Stack>
      </Listbox.Action>
      <Collapsible
        open={ selected }
        id="item-1"
        transition={ transition }
        expandOnPrint
      >
        <Listbox.Option>
          <Heading>Title</Heading><Caption>{ item.title }</Caption>
        </Listbox.Option>
        <Listbox.Option>
          <Heading>Author</Heading><Caption>{ item.author }</Caption>
        </Listbox.Option>
        <Listbox.Option>
          <Heading>Publish Date</Heading><Caption>{ item.publishDate }</Caption>
        </Listbox.Option>
        <Listbox.Option>
          <Heading>Subject</Heading><Caption>{ item.subject }</Caption>
        </Listbox.Option>
        <Listbox.Option>
          <Heading>Price</Heading><Caption>{ item.price }</Caption>
        </Listbox.Option>
        <Listbox.Option>
          <Heading>Quantity</Heading><Caption>{ item.quantity }</Caption>
        </Listbox.Option>
      </Collapsible>
    </React.Fragment>
  )
}
