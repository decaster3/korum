const assert = require("assert")
const ganache = require("ganache-cli")
const Web3 = require("web3")
const web3 = new Web3(ganache.provider())

const compiledFactory = require("../build/Factory.json")
const compiledContract = require("../build/Contract.json")

let accounts
let factory

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({data: compiledFactory.bytecode})
    .send({from: accounts[0], gas: "1000000"})

  await factory.methods.createContract("Test contract").send({
    from: accounts[0],
    gas: "1000000",
  })
  ;[contractAddress] = await factory.methods.getDeployedContracts().call()
  contract = await new web3.eth.Contract(
    JSON.parse(compiledContract.interface),
    contractAddress
  )
})

describe("Contract", () => {
  it("deploys a factory and a contract", () => {
    assert.ok(factory.options.address)
    assert.ok(contract.options.address)
  })
})
