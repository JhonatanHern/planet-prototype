const path = require('path')
const tape = require('tape')

const { Diorama, tapeExecutor, backwardCompatibilityMiddleware } = require('@holochain/diorama')

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.error('got unhandledRejection:', error);
})

const dnaPath = path.join(__dirname, "../dist/backend.dna.json")
const dna = Diorama.dna(dnaPath, 'backend')

const diorama = new Diorama({
  instances: {
    alice: dna,
    bob: dna,
  },
  bridges: [],
  debugLog: false,
  executor: tapeExecutor(tape),
  middleware: backwardCompatibilityMiddleware,
})

diorama.registerScenario("description of example test", async (s, /*t,*/ { alice }) => {
  const res = alice.call("messaging", "reee", {s:'Example String'})
  // t.deepEqual(res, {Ok:'Example String'})
})
diorama.registerScenario("Can create an user", async (s, /*t,*/ { alice }) => {
  const addr = alice.call("messaging", "create_user", {
    "username":"JhonatanHern"
  })
  // t.deepEqual({ Ok: 'QmVVDRffrS8gZXyCDmfB5X6MtcTWhsbeohWyTWrxEQoFZK' },addr)
})
diorama.run()

/*
scenario.runTape("Can create an user", async (t, { alice }) => {
})
scenario.runTape("Does not give false results for profile checking", async (t, { alice }) => {
  let result = alice.call("messaging", "check_register",{})
  t.deepEqual({
    "Ok": {
      "registered": false
    }
  },result)
})
scenario.runTape("Can create own user and check it's existence", async (t, { alice }) => {
  await alice.callSync("messaging", "create_user", {"username":"JhonatanHern"})
  const result = alice.call("messaging", "check_register",{})
  t.deepEqual({
    Ok: {
      registered: true,
      me: {
        App: [
          'user',
          '{"username":"JhonatanHern","address":"HcScjwO9ji9633ZYxa6IYubHJHW6ctfoufv5eq4F7ZOxay8wR76FP4xeG9pY3ui"}'
        ]
      }
    }
  },result)
})

scenario.runTape("Can retrieve users", async (t, { alice , bob }) => {
  let addr
  addr = await bob.callSync("messaging", "create_user", {
    "username":"Mr. Peanutbutter"
  }).then(x=>x)
  addr = await alice.callSync("messaging", "create_user", {
    "username":"Highly acclaimed Character Actress Margo Martindale"
  }).then(x=>x)
  addr =  alice.call("messaging", "get_all_users", {})
  t.deepEqual(addr,{
    Ok: [
      {
        address: 'QmVQbGGyZ47ozohxANJcEq9hoCqBx6ktvk1DD8a2W9xVy4',
        entry: {
          username: 'Mr. Peanutbutter',
          address: 'HcScj5GbxXdTq69sfnz3jcA4u5f35zftsuu5Eb3dBxHjgd9byUUW6JmN3Bvzqqr'
        }
      },
      {
        address: 'QmSRHGQwifAC8VW77w96TwXwxr6U1FVNyCs5oXFweZNU7G',
        entry: {
          username: 'Highly acclaimed Character Actress Margo Martindale',
          address: 'HcScjwO9ji9633ZYxa6IYubHJHW6ctfoufv5eq4F7ZOxay8wR76FP4xeG9pY3ui'
        }
      }
    ]
  })
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
    await alice.callSync("messaging", "create_channel", {entry:{
      "title":"Hollywoo Stars and Celebrities: What Do They Know? Do They Know Things?? Let's Find Out!",
      "description":"Created by J.D. Salinger, this game show for MBN asks celebrities trivia questions to find out if they know things"
    }}).then(x=>x)
    await alice.callSync("messaging", "create_channel", {entry:{
      "title":"Horsin' Around",
      "description":`The show, which is set in Omro, Wisconsin, portrays a young bachelor horse-simply called The Horse, who is forced to reevaluate his priorities when he agrees to raise three human children.`
    }}).then(x=>x)
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

/*
const path = require('path')
const tape = require('tape')

const { Diorama, tapeExecutor, backwardCompatibilityMiddleware } = require('@holochain/diorama')

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.error('got unhandledRejection:', error);
});

const dnaPath = path.join(__dirname, "../dist/backend.dna.json")
const dna = Diorama.dna(dnaPath, 'backend')

const diorama = new Diorama({
  instances: {
    alice: dna,
    bob: dna,
  },
  bridges: [],
  debugLog: false,
  executor: tapeExecutor(require('tape')),
  middleware: backwardCompatibilityMiddleware,
})

diorama.registerScenario("description of example test", async (s, t, { alice }) => {
  // Make a call to a Zome function
  // indicating the function, and passing it an input
  const addr = await alice.call("my_zome", "create_my_entry", {"entry" : {"content":"sample content"}})
  const result = await alice.call("my_zome", "get_my_entry", {"address": addr.Ok})

  // check for equality of the actual and expected results
  t.deepEqual(result, { Ok: { App: [ 'my_entry', '{"content":"sample content"}' ] } })
})

diorama.run()
*/