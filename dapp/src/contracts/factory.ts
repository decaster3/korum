import web3 from "../web3"
import Factory from "../build/Factory.json"

const instance = new web3.eth.Contract(
  JSON.parse(Factory.interface),
  "0x522fb140e213A876aA04D300cB705866994C4bc3"
)

export default instance
