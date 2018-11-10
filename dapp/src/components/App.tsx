import React, {useState, Component} from "react"
import factory from "../contracts/factory"
import New from "./New"

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
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="pr-4">
              <div className="tokens-title">tokens</div>
              <div className="tokens-int">43.5</div>
              <div className="ether-title">etherium wallet</div>
              <div className="ether-int">10.0003</div>
            </div>
          </div>
          <div className="col-4 top-margin">
            <h5 className="title">Energy wallet</h5>
            <div className="card mt-4" style={{width: "18rem"}}>
              <div className="card-body">
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div className="d-flex justify-content-center">
                  <button className="radius-button">
                    Burn tokens for energy
                  </button>
                </div>
                <a className="d-flex justify-content-center">or buy tokens</a>
                <div className="line w-100 " />
                <p className="card-text mt-5">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div className="d-flex justify-content-center">
                  <button className="radius-button">
                    Sell tokens for Etherium
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
