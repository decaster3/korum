import React, {useState, Component} from "react"
import factory from "../contracts/factory"
import logo from "../styles/logo.png"
import web3 from "../web3"
import DonutChart from "react-svg-donut-chart"

interface StationInterface {
  contracts: string[]
  balance: any
}

class Station extends Component<{}, StationInterface> {
  state: StationInterface = {
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
      {value: 100, stroke: "#7B52DB",strokeWidth: 2},
      {value: 60, stroke: "#2eb76d",strokeWidth: 2},
    ]
    return (
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
                    <div className='row'>
                        <div className='col-6'>
                          <p className="card-text mt-5">
                            Some quick example text to build on the card title and make
                            up the bulk of the card's content.
                          </p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
              <div className='col-4'>
                  <div className='stats'>
                      <DonutChart data={dataPie} spacing={1} />
                      <div className='d-flex stats-title align-items-center justify-content-center'>
                        Test
                      </div>
                  </div>
              </div>
      </div>
    )
  }
}

export default Station
