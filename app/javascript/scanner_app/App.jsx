import React, { useEffect, useState } from "react"

import '@shopify/polaris/build/esm/styles.css'
import { AppProvider, Tabs } from '@shopify/polaris'
import enTranslations from '@shopify/polaris/locales/en.json'

import Screen from "./components/Screen"
import ItemsScan from "./screens/ItemsScan"
import ItemsList from "./screens/ItemsList"

import { fetchBookInfo } from "./api"

import useInput from "./hooks/useInput"
import useToggle from "./hooks/useToggle"
import useScanningLog from "./hooks/useScanningLog"

import "./styles.css"

export default function App() {
  const { add, items } = useScanningLog()
  const [screenIndex, setScreenIndex] = useState(0)
  const scanning = screenIndex === 0
  const showScannedItems = () => setScreenIndex(1)
  const showScanner = () => setScreenIndex(0)

  const handleScannedItem = book => {
    add(book)
    showScannedItems()
  }

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

  const screen = scanning
    ? <ItemsScan onScan={ handleScannedItem } />
    : <ItemsList items={ items } onStartScanning={ showScanner } />

  return (
    <AppProvider i18n={enTranslations}>
      <Screen>
        {screen}
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
