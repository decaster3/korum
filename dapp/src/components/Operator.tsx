import React, {useState, Component} from "react"
import web3 from "../web3"

interface OperatorInterface {
  stations: string[]
}

class Operator extends Component<{}, OperatorInterface> {
  state: OperatorInterface = {
    stations: [],
  }

  async componentDidMount() {
    this.setState({
      stations: [
        "0x3b3DE2C94e6d0eCA853a0e45Bbf2E10636Cc02aA",
        "0x3b3DE2C94e6d0eCA853a0e45Bbf2E10636Cc02aa",
        "0x3b3DE2C94e6d0eCA853a0e45Bbf2E10636Cc02vA",
      ],
    })
  }
  onConfirm = address => {
    console.log(address)
  }

  render() {
    return (
      <div className='row'>
          <div className="col-2">
          </div>
          <div className="col-8">
              <h5 className="title">Operator's aprovement</h5>
              <div className="card-operator mt-4 w-100" style={{width: "18rem"}}>
                  <div className="card-body">
                  <p className="card-text">
                      Some quick example text to build on the card title and make
                      up the bulk of the card's content.
                  </p>
                  {this.state.stations.map(station => (
                      <div className='d-flex flex-row wallet mb-3'>
                          <div key={station}>
                              <span className='w-60'> {station}{" "}</span>
                              <span className='descr'>12.03.2018 17:30</span>
                          </div>
                          <button onClick={() => this.onConfirm(station)} className='radius-button-operator'>Confirm</button>
                      </div>
                  ))}
                  </div>
              </div>
          </div>
      </div>
    )
  }
}

export default Operator
