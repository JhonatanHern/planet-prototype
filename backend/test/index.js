// This test file uses the tape testing framework.
// To learn more, go here: https://github.com/substack/tape
const { Config, Scenario } = require("@holochain/holochain-nodejs")
Scenario.setTape(require("tape"))

const dnaPath = "./dist/backend.dna.json"
const agentAlice = Config.agent("alice")
const dna = Config.dna(dnaPath)
const instanceAlice = Config.instance(agentAlice, dna)
const scenario = new Scenario([instanceAlice])

scenario.runTape("description of example test", async (t, { alice }) => {
  const addr = alice.call("messaging", "send_message", {
    "entry" : {
      "content":"sample content"
    },
    destiny: 'QmcXt9K4hYMnFELavRq6UoRb9ibbfTzjTR6q35kiqmxxWH'
  })
  // const result = alice.call("my_zome", "get_my_entry", {"address": addr.Ok})

  // check for equality of the actual and expected results
  // t.deepEqual(result, { Ok: { App: [ 'my_entry', '{"content":"sample content"}' ] } })
  console.log('addr:',addr)
  t.equal(true,!!addr)
})
