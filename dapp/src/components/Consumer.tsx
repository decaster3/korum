import React, {useState, Component} from "react"
import web3 from "../web3"

interface TransactionInterface {
  id: number
  tokens: number
  eth: number
}

interface ConsumerInterface {
  offerings: TransactionInterface[]
  history: TransactionInterface[]
}

class Consumer extends Component<{}, ConsumerInterface> {
  state: ConsumerInterface = {
    offerings: [],
    history: [],
  }

  async componentDidMount() {
    this.setState({
      offerings: [
        {id: 1, tokens: 10, eth: 5},
        {id: 1, tokens: 1, eth: 44},
        {id: 1, tokens: 140, eth: 52},
      ],
      history: [
        {id: 1, tokens: 10, eth: 5},
        {id: 1, tokens: 1, eth: 44},
        {id: 1, tokens: 140, eth: 52},
      ],
    })
  }
  onBuy = address => {
    console.log(address)
  }

  render() {
    return (
      <div>
        Offerings
        {this.state.offerings.map(offering => (
          <div className="card" key={offering.id}>
            <p>Tokens: {offering.tokens}</p>
            <p>Eth: {offering.eth}</p>
            <button onClick={() => this.onBuy(offering)}>Buy</button>
          </div>
        ))}
        <hr />
        History
        {this.state.history.map(item => (
          <div className="card" key={item.id}>
            <p>Tokens: {item.tokens}</p>
            <p>Eth: {item.eth}</p>
          </div>
        ))}
      </div>
    )
  }
}

export default Consumer
