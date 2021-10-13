import React from "react"
import ReactDOM from "react-dom"
import createApp from '@shopify/app-bridge';
import {Group, Scanner, Features} from '@shopify/app-bridge/actions';

import App from "../scanner_app/App"

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById("root")
  )
})
