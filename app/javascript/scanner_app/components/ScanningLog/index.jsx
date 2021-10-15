import React, { useState } from "react"
import {
  Button,
  EmptyState,
  Listbox,
} from "@shopify/polaris"

import Item from "./Item"

import "./styles.scss"

export default function ScanningLog({ items = [], onStartScanning }) {
  const [currentBook, setCurrentBook] = useState()

  const handleSelect = (isbn) => {
    const book = items.find((b) => b.isbn === isbn)
    const selection = currentBook === book ? null : book
    setCurrentBook(selection)
  }

  if (items.length === 0) {
    return (
      <EmptyState
        heading="No books scanned yet"
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p><Button onClick={onStartScanning} plain>Click here</Button> to get started.</p>
      </EmptyState>
    )
  }

  return (
    <div className="scanned-books">
      <Listbox
        accessibilityLabel="Scanned Books"
        onSelect={handleSelect}
      >
        {items.map((book) => (
          <Item
            key={book.isbn}
            item={book}
            selected={currentBook === book}
          />
        ))}
      </Listbox>
    </div>
  )
}
