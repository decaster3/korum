import Tokens from "../build/Tokens.json"

// @ts-ignore
const instance = window.web3.eth.contract(
  JSON.parse(Tokens.interface),
  "0xd73f88E70dbEAa215A5a9e1FC52Cc0e5d6979bb5"
)

export default instance
