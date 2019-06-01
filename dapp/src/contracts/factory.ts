// @ts-ignore
import Factory from "../build/Factory.json"

// @ts-ignore
const instance = window.web3.eth.contract(
  JSON.parse(Factory.interface),
  "0x21fda65868F4cDb434099538A7C1362bc6B89076"
)

export default instance
