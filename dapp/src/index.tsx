import React from "react"
import ReactDOM from "react-dom"
import "./styles/index.css"
import Layout from "./components/Layout"
import * as serviceWorker from "./serviceWorker"
import {BrowserRouter} from "react-router-dom"
import createHistory from "history/createBrowserHistory"

// If you want your Layout to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

const rootElement = document.getElementById("root")

ReactDOM.render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>,
  rootElement
)

if ((module as any).hot) {
  ;(module as any).hot.accept("./components/Layout", () => {
    const NextLayout = require("./components/Layout").default
    ReactDOM.render(
      <BrowserRouter>
        <NextLayout />
      </BrowserRouter>,
      rootElement
    )
  })
}
