import React, {useState, Component} from "react"
import logo from "./logo.svg"
import contract from "./contract"
import web3 from "./web3"

import "./App.css"

interface AppInterface {
  message: string
  value: string
}
class App extends Component<{}, AppInterface> {
  state: AppInterface = {
    message: "",
    value: "",
  }
  async componentDidMount() {
    const message = await contract.methods.message().call()
    this.setState({
      message,
    })
  }
  onSubmit = async () => {
    const accounts = await web3.eth.getAccounts()
    await contract.methods.setMessage(this.state.value).send({
      from: accounts[0],
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{this.state.message}</p>
          <input
            value={this.state.value}
            onChange={event => this.setState({value: event.target.value})}
          />
          <button onClick={this.onSubmit}>Change message</button>
        </header>
      </div>
    )
  }
}

export default App
