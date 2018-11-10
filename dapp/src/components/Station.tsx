import React, {useState, Component} from "react"
import factory from "../contracts/factory"
import tokensContract from "../contracts/tokens"
import station from "../contracts/station"
import web3 from "../web3"
import load1 from "../styles/1.png"
import load2 from "../styles/2.svg"
import DonutChart from "react-svg-donut-chart"
import {RouteComponentProps} from "react-router-dom"

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

interface StationPropsInterface {
  location: RouteComponentProps
  match: RouteComponentProps
}

class Station extends Component<StationPropsInterface, StationInterface> {
  state: StationInterface = {
    tokens: 0,
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
    if (this.props.match.params.id) {
      const isApprovedStation = await station(this.props.match.params.id)
        .methods.isApproved()
        .call()
      if (isApprovedStation) {
        this.setState({
          isStationExist: StationState.APPROVED,
        })
      }
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
    const allStations = await factory.methods.getDeployedStations().call()
    this.setState({
      isStationCreating: false,
    })
    location.replace(`/station/${allStations[allStations.length - 1]}`)
  }
  sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  async onHardcode() {
    this.setState({
      isStationExistLoading: true,
    })
    const address = await web3.eth.getAccounts()
    await factory.methods.hardcode().send({
      from: address[0],
    })
    this.setState({
      tokens: 0,
    })
    this.setState({
      isStationExistLoading: false,
    })
  }

  async onHardcodee() {
    this.setState({
      isStationExistLoading: true,
    })
    const address = await web3.eth.getAccounts()
    await factory.methods.hardcode().send({
      from: address[0],
    })
    this.setState({
      tokens: 23,
    })
    this.setState({
      isStationExistLoading: false,
    })
  }
  render() {
    const dataPie = [
      {value: 30, stroke: "#7B52DB", strokeWidth: 2},
      {value: this.state.tokens, stroke: "#2eb76d", strokeWidth: 2},
    ]
    return (
      <div className="row">
        {this.state.isStationExist === StationState.APPROVED ? (
          <>
            <div className="col-4">
              <div className="pr-4">
                <div className="tokens-title">Токены</div>
                <div className="tokens-int">{this.state.tokens}</div>
                <div className="ether-title">etherium кошелек</div>
                <div className="ether-int">
                  {parseFloat(this.state.balanceEth).toFixed(7)}
                </div>
              </div>
            </div>
            <div className="col-4">
              <h5 className="title">Энергостанция</h5>
              <div className="card mt-4" style={{width: "18rem"}}>
                <div className="card-body">
                  <p className="card-text">Возможности электростанции</p>
                  <div className="d-flex justify-content-center">
                    <button
                      className="radius-button"
                      onClick={() => this.onHardcode()}
                    >
                      Продать токены
                    </button>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      className="radius-button"
                      onClick={() => this.onHardcodee()}
                    >
                      Обновить показатели
                    </button>
                  </div>
                  <div className="line w-100 " />
                  <div className="row mt-5">
                    <div className="col-6">
                      <p className="card-title">Показатели отношения энергии</p>
                      <p className="card-text mt-3">
                        Здесь отражены данные об отношении "зеленой энергии" к
                        обычной
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
                  <p className="stats-green-title">
                    {parseInt(this.state.tokens)} токенов
                  </p>
                  <p className="stats-green-dest">
                    {30} кв*час неперерабатываемой энергии
                  </p>
                </div>
              </div>
              <div className="stats">
                <DonutChart data={dataPie} spacing={1} />
                <div className="d-flex stats-title align-items-center flex-column justify-content-center">
                  {parseInt(this.state.tokens) + 30}
                  <span className="stats-sub">Всего токенов</span>
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
                  <div className="d-flex w-100 align-items-center justify-content-center loader">
                    <div className="loader-form-sm position-relative">
                      <img className="load-img-1 d-block" src={load1} />
                      <img className="load-img-2 d-block" src={load2} />
                    </div>
                    <div className="position-relative">
                      <img className="load-img-1 d-block" src={load1} />
                      <img className="load-img-2 d-block" src={load2} />
                    </div>
                    <div className="loader-form-sm position-relative">
                      <img className="load-img-1 d-block" src={load1} />
                      <img className="load-img-2 d-block" src={load2} />
                    </div>
                  </div>
                ) : (
                  <div className="w-100 d-flex justify-content-center">
                    <button
                      className="radius-button"
                      onClick={() => this.onStationCreate()}
                    >
                      Create station
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                {this.state.isStationExistLoading ? (
                  <div className="d-flex w-100 align-items-center justify-content-center loader">
                    <div className="loader-form-sm position-relative">
                      <img className="load-img-1 d-block" src={load1} />
                      <img className="load-img-2 d-block" src={load2} />
                    </div>
                    <div className="position-relative">
                      <img className="load-img-1 d-block" src={load1} />
                      <img className="load-img-2 d-block" src={load2} />
                    </div>
                    <div className="loader-form-sm position-relative">
                      <img className="load-img-1 d-block" src={load1} />
                      <img className="load-img-2 d-block" src={load2} />
                    </div>
                  </div>
                ) : (
                  <div className="w-100 d-flex justify-content-center">
                    Не подтверждена
                  </div>
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
