import React, {useState, Component} from "react"
import logo from "./logo.svg"
import contract from "./contract"
import "./App.css"

interface AppInterface {
  message: string
}
class App extends Component<{}, AppInterface> {
  state: AppInterface = {
    message: "",
  }
  async componentDidMount() {
    const message = await contract.methods.message().call()
    console.log(message)
    this.setState({
      message,
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{this.state.message}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default App
