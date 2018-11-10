import web3 from "../web3"
import Factory from "../build/Factory.json"

const instance = new web3.eth.Contract(
  JSON.parse(Factory.interface),
  "0xff08A268aCb1d5C12FCc5f0577e3131AEA1E7723"
)

export default instance
