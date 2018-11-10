import web3 from "../web3"
import Tokens from "../build/Tokens.json"

const instance = new web3.eth.Contract(
  JSON.parse(Tokens.interface),
  "0xd73f88E70dbEAa215A5a9e1FC52Cc0e5d6979bb5"
)

export default instance
