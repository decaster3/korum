import Robonomics from "robonomics-js"
import Provider from "./provider"
import {IPFS_PUBSUB, ENS, VERSION} from "./config"

let robonomics = null
const getRobonomics = async lighthouse => {
  if (robonomics === null) {
    // @ts-ignore
    const account = (await window.web3.currentProvider.enable())[0]
    // @ts-ignore
    const socket = window.io(IPFS_PUBSUB)
    robonomics = new Robonomics({
      // @ts-ignore
      web3: window.web3,
      account,
      provider: new Provider(socket),
      lighthouse,
      ens: ENS,
      version: VERSION,
    })
  }
  return robonomics
}

export default getRobonomics
