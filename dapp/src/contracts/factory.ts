import web3 from "../web3"
import Factory from "../build/Factory.json"

const instance = new web3.eth.Contract(
  JSON.parse(Factory.interface),
  "0xC44C331416dDA667Bf0D6e7bd857f705581a6A23"
)

export default instance
