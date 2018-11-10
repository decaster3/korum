import React, {useState, Component} from "react"
import factory from "../contracts/factory"
import tokensContract from "../contracts/tokens"
import logo from "../styles/logo.png"
import web3 from "../web3"
import DonutChart from "react-svg-donut-chart"

enum StationState {
  NOT_APPROVED = "NOT_APPROVED",
  NOT_EXIST = "NOT_EXIST",
  UNKNOWN = "UNKNOWN",
  APPROVED = "APPROVED",
}

interface StationInterface {
  tokens: any
  balanceEth: any
  isStationExistLoading: boolean
  isStationCreating: boolean
  isStationExist: StationState
}

class Station extends Component<{}, StationInterface> {
  state: StationInterface = {
    tokens: [],
    balanceEth: "",
    isStationExistLoading: false,
    isStationExist: StationState.UNKNOWN,
    isStationCreating: false,
  }

  componentDidMount() {
    this.getInitData()
  }

  async getInitData() {
    this.setState({
      isStationExistLoading: true,
    })
    const address = await web3.eth.getAccounts()
    const stationManagers = await factory.methods.getStationManagers().call()
    this.setState({
      isStationExistLoading: false,
      isStationExist: stationManagers.includes(address[0])
        ? StationState.NOT_APPROVED
        : StationState.NOT_EXIST,
    })
    const isApprovedStation = await factory.methods.approved
    if (isApprovedStation) {
      this.setState({
        isStationExist: StationState.APPROVED,
      })
    }
    web3.eth.getBalance(address[0]).then((balanceEth: any) => {
      this.setState({
        balanceEth: web3.utils.fromWei(balanceEth, "ether"),
      })
    })
    const tokens = await tokensContract.methods.getTokens(address[0]).call()
    this.setState({
      tokens,
    })
  }

  async onStationCreate() {
    this.setState({
      isStationCreating: true,
    })
    const address = await web3.eth.getAccounts()
    web3.eth.getBalance(address[0]).then((balanceEth: any) => {
      this.setState({
        balanceEth: web3.utils.fromWei(balanceEth, "ether"),
      })
    })
    await factory.methods.createStation().send({
      from: address[0],
    })
    this.setState({
      isStationCreating: false,
    })
    this.getInitData()
  }

  render() {
    const dataPie = [
      {value: 100, stroke: "#7B52DB", strokeWidth: 2},
      {value: 60, stroke: "#2eb76d", strokeWidth: 2},
    ]
    return (
      <div className="row">
        {this.state.isStationExist === StationState.APPROVED ? (
          <>
            <div className="col-4">
              <div className="pr-4">
                <div className="tokens-title">tokens</div>
                <div className="tokens-int">{this.state.tokens}</div>
                <div className="ether-title">etherium wallet</div>
                <div className="ether-int">
                  {parseFloat(this.state.balanceEth).toFixed(7)}}
                </div>
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
                    <button className="radius-button">Sell tokens</button>
                  </div>
                  <a className="d-flex justify-content-center">or buy tokens</a>
                  <div className="line w-100 " />
                  <div className="row mt-5">
                    <div className="col-6">
                      <p className="card-title">Full pull stats</p>
                      <p className="card-text mt-3">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <div className="d-flex justify-content-center">
                        <button className="radius-button">
                          Burn tokens for energy
                        </button>
                      </div>
                      <a className="d-flex justify-content-center">
                        or buy tokens
                      </a>
                      <div className="line w-100 " />
                      <div className="row">
                        <div className="col-6">
                          <p className="card-text mt-5">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stats-green-info d-flex flex-row align-items-center">
                    <span className="green-cube" />
                    <div>
                      <p className="stats-green-title">20% Green Energy</p>
                      <p className="stats-green-dest">1243 tokens in pull</p>
                    </div>
                  </div>
                  <div className="stats">
                    <DonutChart data={dataPie} spacing={1} />
                    <div className="d-flex stats-title align-items-center flex-column justify-content-center">
                      20 342
                      <span className="stats-sub">tokens inside pull</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            {this.state.isStationExist === StationState.NOT_EXIST ? (
              <>
                {this.state.isStationCreating ? (
                  <div> Loading </div>
                ) : (
                  <button onClick={() => this.onStationCreate()}>
                    Create station
                  </button>
                )}
              </>
            ) : (
              <>
                {this.state.isStationExistLoading ? (
                  <div> Loading </div>
                ) : (
                  <>Not approved</>
                )}
              </>
            )}
          </>
        )}
      </div>
    )
  }
}

export default Station
