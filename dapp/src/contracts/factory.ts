import web3 from "../web3"
import Factory from "../build/Factory.json"

const instance = new web3.eth.Contract(
  JSON.parse(Factory.interface),
  "0x21fda65868F4cDb434099538A7C1362bc6B89076"
)

export default instance
