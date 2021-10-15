import React, { useState } from "react"
import {
  Button,
  Stack,
  ButtonGroup,
  TextField,
  DisplayText,
  Form,
} from '@shopify/polaris';

import ScanningLog from "../components/ScanningLog"

import "./styles.scss"

export default function ItemsList({ items = [], onStartScanning }) {
  return (
    <div className="items-list">
      <Stack vertical distribution="center" alignment="fill">
        <DisplayText size="medium">Items List</DisplayText>
        <ScanningLog items={items} onStartScanning={onStartScanning} />
      </Stack>
    </div>
  )
}
