import React, {useState, Component} from "react"
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
    // @ts-ignore
    const myAddress = await window.web3.eth.getAccounts()
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
          <div>Loading</div>
        ) : (
          <>
            <div className="col-2" />
            <div className="col-8">
              <h5 className="title">Operator's aprovement</h5>
              <div
                className="card-operator mt-4 w-100"
                style={{width: "18rem"}}
              >
                <div className="card-body">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
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
