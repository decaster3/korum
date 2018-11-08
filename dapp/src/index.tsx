import React from "react"
import ReactDOM from "react-dom"
import "./styles/index.css"
import App from "./components/App"
import * as serviceWorker from "./serviceWorker"

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

const rootElement = document.getElementById("root")

ReactDOM.render(<App />, rootElement)

if ((module as any).hot) {
  ;(module as any).hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default
    ReactDOM.render(<NextApp />, rootElement)
  })
}
