import React, {Component} from "react"
import {LIGHTHOUSE} from "../config"
import getRobonomics from "../robonomics"
import load1 from "../styles/1.png"
import load2 from "../styles/2.svg"
import ipfsApi from "ipfs-api"
import {open} from "rosbag"
import factory from "../contracts/factory"

console.log(factory)

const ipfs = ipfsApi("/ip4/127.0.0.1/tcp/5001")

// ipfs.files.get(
//   "QmVpXekGgS6AawrvgRYWeSYvFGUcniN76rkZAUTnqaUyn1",
//   (err, files) => {
//     files.forEach(file => {
//       console.log(file.path)
//       console.log(file.content.toString("utf8"))
//     })
//   }
// )

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
    this.getRobonomics()
  }

  getRobonomics = async () => {
    const robonomics = await getRobonomics(LIGHTHOUSE)
    robonomics.ready().then(() => {
      console.log("robonomics js ready")
      console.log("xrt", robonomics.xrt.address)
      console.log("factory", robonomics.factory.address)
      console.log("lighthouse default", robonomics.lighthouse.address)
      robonomics.getResult(msg => {
        console.log("result", msg)
        ipfs.files.get(msg.result, (err, files) => {
          files.forEach(async file => {
            console.log(file.path)
            console.log(file.content.toString("utf8"))
            const bag = await open(file)
            await bag.readMessages(
              {topics: [`/liability/eth_${msg.liability}/data`]},
              result => {
                // topic is the topic the data record was in
                // in this case it will be either '/foo' or '/bar'
                console.log(result.topic)

                // message is the parsed payload
                // this payload will likely differ based on the topic
                console.log(result.message)
              }
            )
          })
        })
      })
    })
  }

  onBuy = address => {
    console.log(address)
  }

  render() {
    const loading = false
    return loading ? (
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
      <div className="row">
        <div className="col-2 mt-5">
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
                <div className="d-flex flex-row wallet mb-3">
                  <div className="d-flex flex-column" key={offering.id}>
                    <div>
                      <span className="buy-token">{offering.eth + " eth"}</span>
                      <span className="green-descr ml-auto">
                        {offering.tokens + " tokens"}
                      </span>
                    </div>
                    <div>
                      <span className="descr">12.03.2018 17:30</span>
                    </div>
                  </div>
                  <button
                    onClick={() => this.onBuy(offering)}
                    className="ml-auto p-2 align-self-center radius-button-operator"
                  >
                    Buy
                  </button>
                </div>
              ))}
              <hr />
            </div>
          </div>
        </div>
        <div className="col-4 opacity">
          <h5 className="title">History</h5>
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
