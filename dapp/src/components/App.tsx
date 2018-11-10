import React, {useState, Component} from "react"
import factory from "../contracts/factory"
import logo from "../styles/logo.png"
import web3 from "../web3"
import DonutChart from "react-svg-donut-chart"

interface AppInterface {
  contracts: string[]
  balance: any
}

class App extends Component<{}, AppInterface> {
  state: AppInterface = {
    contracts: [],
    balance: "",
  }

  async componentDidMount() {
    const address = await web3.eth.getAccounts()
    web3.eth.getBalance(address[0]).then((balance: any) => {
      this.setState({
        balance: web3.utils.fromWei(balance, "ether"),
      })
    })
    const contracts = await factory.methods.getDeployedContracts().call()
    this.setState({
      contracts,
    })
  }

  render() {
    const dataPie = [
      {value: 100, stroke: "#b72eb7"},
      {value: 60, stroke: "#2eb76d"},
    ]
    return (
      <div>
        <nav className="navbar">
          <ul className="nav">
            <li className="nav-item">
              <div className="navbar-brand">
                <img src={logo} width="40" height="35" alt="" />
              </div>
            </li>
            <li className="nav-item d-flex align-items-center">
              <div className="menu icon" />
            </li>
          </ul>
        </nav>
        <div className="container top-margin">
          <div className="row">
            <div className="col-4">
              <div className="pr-4">
                <div className="tokens-title">tokens</div>
                <div className="tokens-int">43.5</div>
                <div className="ether-title">etherium wallet</div>
                <div className="ether-int">{this.state.balance}</div>
              </div>
            </div>
            <div className="col-4">
              <h5 className="title">Energy wallet</h5>
              <div className="card mt-4" style={{width: "18rem"}}>
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <div className="d-flex justify-content-center">
                    <button className="radius-button">
                      Burn tokens for energy
                    </button>
                  </div>
                  <a className="d-flex justify-content-center">or buy tokens</a>
                  <div className="line w-100 " />
                  <p className="card-text mt-5">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <div className="d-flex justify-content-center">
                    <button className="radius-button">
                      Sell tokens for Etherium
                    </button>
                  </div>
                  <DonutChart data={dataPie} />
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
