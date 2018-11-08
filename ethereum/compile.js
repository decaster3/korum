const path = require("path")
const solc = require("solc")
const fs = require("fs-extra")

const buildPathEth = path.resolve(__dirname, "build")
const buildPathDapp = path.resolve(__dirname, "../dapp/src/build")
fs.removeSync(buildPathEth)
fs.removeSync(buildPathDapp)

const campaignPath = path.resolve(__dirname, "contracts", "Contracts.sol")
const source = fs.readFileSync(campaignPath, "utf8")
const output = solc.compile(source, 1).contracts

fs.ensureDirSync(buildPathEth)
fs.ensureDirSync(buildPathDapp)

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPathEth, contract.replace(":", "") + ".json"),
    output[contract]
  )
}

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPathDapp, contract.replace(":", "") + ".json"),
    output[contract]
  )
}
