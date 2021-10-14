import React from "react"
import { Button, Stack, ButtonGroup, TextField, DisplayText } from '@shopify/polaris';

import "./styles.scss"

export default function ItemsScan() {
  return (
    <div className="items-scan">
      <Stack vertical distribution="center" alignment="center">
        <DisplayText size="medium">Scan Items</DisplayText>
        <ButtonGroup segmented>
          <Button>New</Button>
          <Button>Used</Button>
        </ButtonGroup>
        <Stack spacing="none">
          <Stack.Item fill>
            <TextField name="isbn" placeholder="ISBN lookup" />
          </Stack.Item>
          <Button>Enter</Button>
        </Stack>
      </Stack>
    </div>
  )
}