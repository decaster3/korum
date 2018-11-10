import React, {useState, Component} from "react"
import web3 from "../web3"
import load1 from "../styles/1.png"
import load2 from "../styles/2.svg"

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
      <div className='row'>
          <div className='loader-form'>
              <span className='load-img-1'><img className='img-1' src={load1}/></span>
              <img className='load-img-2' src={load2}/>
          </div>
          <div className='loader-form-2'>
              <span className='load-img-1'><img className='img-1' src={load1}/></span>
              <img className='load-img-2' src={load2}/>
          </div>
          <div className='col-2 mt-5'>
              <div>
                  <div className="ether-title">etherium wallet</div>
                  <div className="ether-int">{5.007}</div>
              </div>
          </div>
          <div className="col-6">
              <h5 className="title">Offerings</h5>
              <div className="card-consumer mt-4">
                  <div className="card-body">
                      {this.state.offerings.map(offering => (
                          <div className='d-flex flex-row wallet mb-3'>
                              <div className='d-flex flex-column' key={offering.id}>
                                  <div>
                                      <span className='buy-token'>{offering.eth + ' eth'}</span>
                                      <span className='green-descr ml-auto'>{offering.tokens + ' tokens'}</span>
                                  </div>
                                  <div>
                                  <span className='descr'>12.03.2018 17:30</span>
                                  </div>
                              </div>
                              <button onClick={() => this.onBuy(offering)} className='ml-auto p-2 align-self-center radius-button-operator'>Buy</button>
                          </div>
                      ))}
                      <hr />
                  </div>
              </div>
          </div>
          <div className='col-4 opacity'>
              <h5 className="title">History</h5>
              <div className="mt-4" >
                  <div className="card-body">
                      {this.state.history.map(item => (
                          <div className='d-flex flex-row wallet mb-3'>
                              <div className='d-flex flex-column' key={item.id}>
                                  <div>
                                      <span className='buy-token'>{item.eth + ' eth'}</span>
                                      <span className='green-descr ml-auto'>{item.tokens + ' tokens'}</span>
                                  </div>
                                  <div>
                                      <span className='descr'>12.03.2018 17:30</span>
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
