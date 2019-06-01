import Station from "../build/Station.json"

export default address => {
  // @ts-ignore
  return window.web3.eth.contract(JSON.parse(Station.interface), address)
}
