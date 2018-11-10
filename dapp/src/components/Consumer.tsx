import React, {useState, Component} from "react"
import web3 from "../web3"
import load1 from "../styles/1.png"
import load2 from "../styles/2.svg"
import factory from "../contracts/factory"

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
        {id: 2, tokens: 23, eth: 1},
        {id: 5, tokens: 26, eth: 1},
        {id: 8, tokens: 29, eth: 1},
      ],
      history: [{id: 1, tokens: 10, eth: 5}],
    })
  }
  onBuy = address => {
    console.log(address)
  }
  async hardCode() {
    const address = await web3.eth.getAccounts()
    web3.eth
      .sendTransaction({
        from: address[0],
        to: "0x522fb140e213A876aA04D300cB705866994C4bc3",
        value: web3.utils.toWei("1", "ether"),
      })
      .then(() => {})
    this.sleep(10000).then(() => {
      this.setState({
        offerings: [{id: 5, tokens: 26, eth: 1}, {id: 8, tokens: 29, eth: 1}],
      })
      this.setState({
        history: [...this.state.history, {id: 2, tokens: 23, eth: 1}],
      })
    })
  }
  sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  render() {
    return (
      <div className="row">
        <div className="col-2 mt-5">
          <div>
            <div className="ether-title">etherium кошелек</div>
            <div className="ether-int" />
          </div>
        </div>
        <div className="col-6">
          <h5 className="title">Покупка</h5>
          <div className="card-consumer mt-4">
            <div className="card-body">
              {this.state.offerings.map(offering => (
                <div className="d-flex flex-row wallet mb-3">
                  <div className="d-flex flex-column" key={offering.id}>
                    <div>
                      <span className="buy-token">{offering.eth + " eth"}</span>
                      <span className="green-descr ml-auto">
                        {offering.tokens + " токена"}
                      </span>
                    </div>
                    <div>
                      <span className="descr">12.03.2018 17:30</span>
                    </div>
                  </div>
                  <button
                    onClick={() => this.hardCode()}
                    className="ml-auto p-2 align-self-center radius-button-operator"
                  >
                    Купить
                  </button>
                </div>
              ))}
              <hr />
            </div>
          </div>
        </div>
        <div className="col-4 opacity">
          <h5 className="title">История</h5>
          <div className="mt-4">
            <div className="card-body">
              {this.state.history.map(item => (
                <div className="d-flex flex-row wallet mb-3">
                  <div className="d-flex flex-column" key={item.id}>
                    <div>
                      <span className="buy-token">{item.eth + " eth"}</span>
                      <span className="green-descr ml-auto">
                        {item.tokens + " tokens"}
                      </span>
                    </div>
                    <div>
                      <span className="descr">12.03.2018 17:30</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Consumer
