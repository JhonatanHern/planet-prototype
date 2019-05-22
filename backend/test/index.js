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
scenario.runTape("Does not give false results for profile checking", async (t, { alice }) => {
  let result = alice.call("messaging", "checkregister",{})
  t.deepEqual({
    "Ok": {
      "registered": false
    }
  },result)
})
scenario.runTape("Can create own user and check it's existence", async (t, { alice }) => {
  const addr = alice.call("messaging", "create_user", {
    "username":"JhonatanHern"
  })
  t.deepEqual({
    Ok:'QmTCKLfVeMcdeSKHm8Jfc5sGa81VVeKtzgi5AT72XEeYx1'
  },addr)
  let result = alice.call("messaging", "checkregister",{})
  t.deepEqual({
    "Ok": {
      "registered": true
    }
  },result)
})
scenario.runTape("Can retrieve users", async (t, { alice }) => {
  let addr
  addr = alice.call("messaging", "create_user", {
    "username":"Mr. Peanutbutter"
  })
  addr = alice.call("messaging", "create_user", {
    "username":"Highly acclaimed Character Actress Margo Martindale"
  })
  addr =  alice.call("messaging", "get_all_users", {})
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
scenario.runTape("Can create channels", async (t, { alice }) => {
  let chan1 = alice.call("messaging", "create_channel", {entry:{
    "title":"Hollywoo Stars and Celebrities: What Do They Know? Do They Know Things?? Let's Find Out!",
    "description":"Created by J.D. Salinger, this game show for MBN asks celebrities trivia questions to find out if they know things"
  }})
  let chan2 = alice.call("messaging", "create_channel", {entry:{
    "title":"Horsin' Around",
    "description":`The show, which is set in Omro, Wisconsin, portrays a young bachelor horse-simply called The Horse, who is forced to reevaluate his priorities when he agrees to raise three human children.`
  }})
  t.deepEqual({ Ok: 'Qmf6EbXsgie8hQtQZ9Vd9NNFKNnrxcnE4dv7nSoyDFmnkW' },chan1)
  t.deepEqual({ Ok: 'QmWXf4MeFDchbGv6oa4c6tMNK63N3pn9GnzJwKLv7F7Rku' },chan2)
})
scenario.runTape("Can retrieve channels", async (t, { alice }) => {
  alice.call("messaging", "create_channel", {entry:{
    "title":"Hollywoo Stars and Celebrities: What Do They Know? Do They Know Things?? Let's Find Out!",
    "description":"Created by J.D. Salinger, this game show for MBN asks celebrities trivia questions to find out if they know things"
  }})
  alice.call("messaging", "create_channel", {entry:{
    "title":"Horsin' Around",
    "description":`The show, which is set in Omro, Wisconsin, portrays a young bachelor horse-simply called The Horse, who is forced to reevaluate his priorities when he agrees to raise three human children.`
  }})
  let result =  alice.call("messaging", "get_all_channels", {})
  t.deepEqual({
    Ok: [
      {
        address: 'Qmf6EbXsgie8hQtQZ9Vd9NNFKNnrxcnE4dv7nSoyDFmnkW',
        entry: {
          title: 'Hollywoo Stars and Celebrities: What Do They Know? Do They Know Things?? Let\'s Find Out!', 
          description: 'Created by J.D. Salinger, this game show for MBN asks celebrities trivia questions to find out if they know things'
        }
      },
      {
        address: 'QmWXf4MeFDchbGv6oa4c6tMNK63N3pn9GnzJwKLv7F7Rku',
        entry:{
          title: 'Horsin\' Around',
          description: 'The show, which is set in Omro, Wisconsin, portrays a young bachelor horse-simply called The Horse, who is forced to reevaluate his priorities when he agrees to raise three human children.'
        }
      }
    ] 
  },result)
})