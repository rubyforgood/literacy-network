import React, { useEffect, useState } from "react"

import '@shopify/polaris/build/esm/styles.css'
import { AppProvider, Tabs } from '@shopify/polaris'
import enTranslations from '@shopify/polaris/locales/en.json'

import Screen from "./components/Screen"
import ItemsScan from "./screens/ItemsScan"

import { fetchBookInfo } from "./api"

import useToggle from "./hooks/useToggle"
import useInput from "./hooks/useInput"

import "./styles.css"

export default function App() {
  const [screenIndex, setScreenIndex] = useState(0)
  const scanning = screenIndex === 0

  const tabs = [
    {
      id: "scanner",
      content: "Scanner",
      accessibilityLabel: "Scanner",
      panelID: "scanner",
    },
    {
      id: "items-list",
      content: "Items List",
      accessibilityLabel: "items-list",
      panelID: "items-list",
    },
  ]

  return (
    <AppProvider i18n={enTranslations}>
      <Screen>
        {scanning ? <ItemsScan /> : <div>"Items List Screen"</div>}
        <Tabs
          tabs={tabs}
          selected={screenIndex}
          onSelect={setScreenIndex}
          fitted
        />
      </Screen>
    </AppProvider>
  )
}
