import React from "react"
import BarcodeScanner from "react-qr-barcode-scanner"

import "./Scanner.css"

export default function Scanner({ onScan }) {
  const handleUpdate = (err, result) => {
    if (err) {
      console.error(err)
    }

    if (result) {
      console.log(">>>>>>", result)
      onScan(result.text)
    }
  }

  return (
    <BarcodeScanner onUpdate={handleUpdate} />
  )
}
