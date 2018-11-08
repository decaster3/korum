import web3 from "../web3"
import Factory from "../build/Factory.json"

const instance = new web3.eth.Contract(
  JSON.parse(Factory.interface),
  "0x1e28a970187aDAA6065F75dAD9da2a8031Dd5425"
)

export default instance
