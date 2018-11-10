import web3 from "../web3"
import Factory from "../build/Factory.json"

const instance = new web3.eth.Contract(
  JSON.parse(Factory.interface),
  "0x401FD82641a08E3170a0fAF77D4850fDC2895ED2"
)

export default instance
