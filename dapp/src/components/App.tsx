import React, {useState, Component} from "react"
import factory from "../contracts/factory"
import New from "./New"

import "../styles/App.css"

interface AppInterface {
  contracts: string[]
}

class App extends Component<{}, AppInterface> {
  state: AppInterface = {
    contracts: [],
  }

  async componentDidMount() {
    const contracts = await factory.methods.getDeployedContracts().call()
    this.setState({
      contracts,
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.contracts.map(address => (
          <div key={address}>
            <p>Address: {address}</p>
          </div>
        ))}
        <New />
      </div>
    )
  }
}

export default App
