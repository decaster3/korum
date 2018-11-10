import web3 from "../web3"
import Factory from "../build/Factory.json"

const instance = new web3.eth.Contract(
  JSON.parse(Factory.interface),
  "0x72178473320F892d35Fe24fd6aA7a64fE20Aa725"
)

export default instance
