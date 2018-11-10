import React, {useState, Component} from "react"
import web3 from "../web3"
import load1 from "../styles/1.png"
import load2 from "../styles/2.svg"
import factory from "../contracts/factory"
import station from "../contracts/station"

interface OperatorInterface {
  stations: string[]
  isStationsLoading: boolean
}

class Operator extends Component<{}, OperatorInterface> {
  state: OperatorInterface = {
    stations: [],
    isStationsLoading: false,
  }

  async componentDidMount() {
    this.setState({
      isStationsLoading: true,
    })
    const stations = await factory.methods.getDeployedStations().call()
    this.setState({
      stations,
      isStationsLoading: false,
    })
  }
  async onConfirm(address) {
    this.setState({
      isStationsLoading: true,
    })
    const myAddress = await web3.eth.getAccounts()
    await station(address)
      .methods.approveStation()
      .send({
        from: myAddress[0],
      })
    this.setState({
      isStationsLoading: false,
    })
  }

  render() {
    return (
      <div className="row">
        {this.state.isStationsLoading ? (
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
          <>
            <div className="col-2" />
            <div className="col-8">
              <h5 className="title-spec">Подтверждение управляющего органа</h5>
              <div
                className="card-operator mt-4 w-100"
                style={{width: "18rem"}}
              >
                <div className="card-body">
                  <p className="card-text">
                    Управляющая компания подтверждает станцию, после чего
                    станция может начать добывать электроэнергию
                  </p>
                  {this.state.stations.map(station => (
                    <div className="d-flex flex-row wallet mb-3">
                      <div key={station}>
                        <span className="w-60"> {station} </span>
                        <br />
                        <span className="descr">12.03.2018 17:30</span>
                      </div>
                      <button
                        onClick={() => this.onConfirm(station)}
                        className="radius-button-operator"
                      >
                        Confirm
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }
}

export default Operator
