import React from "react"
import { Page } from '@shopify/polaris';

import "./styles.scss"

export default function Screen({ children }) {
  return (
    <div className="screen">
      <Page>
        {children}
      </Page>
    </div>
  )
}
