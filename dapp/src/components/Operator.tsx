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
      <div>
        {this.state.stations.map(station => (
          <div key={station}>
            {station}{" "}
            <button onClick={() => this.onConfirm(station)}>Confirm</button>
          </div>
        ))}
      </div>
    )
  }
}

export default Operator
