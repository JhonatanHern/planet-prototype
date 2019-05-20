// This test file uses the tape testing framework.
// To learn more, go here: https://github.com/substack/tape
const { Config, Scenario } = require("@holochain/holochain-nodejs")
Scenario.setTape(require("tape"))

const dnaPath = "./dist/backend.dna.json"
const agentAlice = Config.agent("alice")
const dna = Config.dna(dnaPath)
const instanceAlice = Config.instance(agentAlice, dna)
const scenario = new Scenario([instanceAlice])

scenario.runTape("Can call a function", async (t, { alice }) => {
  const res = alice.call("messaging", "reee", {s:'Example String'})
  t.deepEqual({Ok:'Example String'},res)
})

scenario.runTape("Can create an user", async (t, { alice }) => {
  const addr = alice.call("messaging", "create_user", {
    "username":"JhonatanHern"
  })
  t.deepEqual({Ok:'QmTCKLfVeMcdeSKHm8Jfc5sGa81VVeKtzgi5AT72XEeYx1'},addr)
})
scenario.runTape("Can retrieve an user", async (t, { alice }) => {
  const addr = alice.call("messaging", "create_user", {
    "username":"JhonatanHern"
  })
  t.deepEqual({Ok:'QmTCKLfVeMcdeSKHm8Jfc5sGa81VVeKtzgi5AT72XEeYx1'},addr)
})

scenario.runTape("Can retrieve users", async (t, { alice }) => {
  let addr
  addr = alice.call("messaging", "create_user", {
    "username":"Mr. Peanutbutter"
  })
  console.log('addr', JSON.stringify(addr,null,2))
  addr = alice.call("messaging", "create_user", {
    "username":"Highly acclaimed Character Actress Margo Martindale"
  })
  console.log('addr', JSON.stringify(addr,null,2))
  addr =  alice.call("messaging", "get_all_users", {})
  console.log('addr', JSON.stringify(addr,null,2))
  t.deepEqual({
    "Ok":[
      {
        "address":"QmQPqStoZJheX3sDUbYKf8PhUMh47udbgz89LXmzhvcwPB",
        "entry":{
          "username":"Mr. Peanutbutter"
        }
      },
      {
        "address":"QmThRCD334FSQdNZMTecqa447nEV1dogccJQfpyySWPW62",
        "entry":{
          "username":"Highly acclaimed Character Actress Margo Martindale"
        }
      }
    ]
  },addr)
})
scenario.runTape("Can retrieve channels", async (t, { alice }) => {
  alice.call("messaging", "create_channel", {
    "title":"Hollywoo Stars and Celebrities: What Do They Know? Do They Know Things?? Let's Find Out!",
    "description":"Created by J.D. Salinger, this game show for MBN asks celebrities trivia questions to find out if they know things"
  })
  alice.call("messaging", "create_channel", {
    "title":"Horsin' Around",
    "description":`The show, which is set in Omro, Wisconsin, portrays a young bachelor horse-simply called The Horse, who is forced to reevaluate his priorities when he agrees to raise three human children.`
  })
  let addr =  alice.call("messaging", "get_all_channels", {})
  console.log('addr', JSON.stringify(addr,null,2))
  t.deepEqual({
    "Ok":[
      {
        "address":"QmQPqStoZJheX3sDUbYKf8PhUMh47udbgz89LXmzhvcwPB",
        "entry":{
          "username":"Mr. Peanutbutter"
        }
      },
      {
        "address":"QmThRCD334FSQdNZMTecqa447nEV1dogccJQfpyySWPW62",
        "entry":{
          "username":"Highly acclaimed Character Actress Margo Martindale"
        }
      }
    ]
  },addr)
})