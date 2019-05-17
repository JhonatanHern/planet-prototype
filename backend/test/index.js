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

scenario.runTape("Can create a profile", async (t, { alice }) => {
  const addr = alice.call("messaging", "create_user", {
    "username":"JhonatanHern"
  })
  t.deepEqual({Ok:'QmTCKLfVeMcdeSKHm8Jfc5sGa81VVeKtzgi5AT72XEeYx1'},addr)
})

scenario.runTape("Can create a channel", async (t, { alice }) => {
  const addr = alice.call("messaging", "create_channel", {
    entry:{
      "title":"sample channel",
      'description':'lipsum'
    }
  })
  t.deepEqual({ Ok: 'QmWofs1NnFxwXtnXuXyAQKCbHP7CvF18qeHKuZZ7QBzuWY' },addr)
})
/*
scenario.runTape("Can send a message", async (t, { alice }) => {
  const addr = alice.call("messaging", "send_message", {
    "entry" : {
      "content":"sample content"
    },
    'destiny': 'QmcXt9K4hYMnFELavRq6UoRb9ibbfTzjTR6q35kiqmxxWH'
  })
  // const result = alice.call("my_zome", "get_my_entry", {"address": addr.Ok})

  // check for equality of the actual and expected results
  // t.deepEqual(result, { Ok: { App: [ 'my_entry', '{"content":"sample content"}' ] } })
  console.log('addr:',addr)
  t.equal(true,!!addr)
})
*/
//////////////////////////////////////////////////////////////////////
/*
const testNewChannelParams = {
  name: "test new stream",
  description: "for testing...",
  initial_members: [],
  public: true
}

const testMessage = {
  timestamp: 0,
  message_type: "text",
  payload: "I am the message payload",
  meta: "{}",
}


scenario.runTape('Can register a profile and retrieve', async (t, {alice}) => {
  const register_result = await alice.callSync('chat', 'register', {name: 'alice', avatar_url: ''})
  console.log(register_result)
  t.equal(register_result.Ok.length, 63)

  const get_profile_result = await alice.callSync('chat', 'get_member_profile', {agent_address: register_result.Ok})
  console.log(get_profile_result)
})

scenario.runTape('Can create a public stream with no other members and retrieve it', async (t, {alice}) => {
 
  const register_result = await alice.callSync('chat', 'register', {name: 'alice', avatar_url: ''})
  console.log(register_result)
  t.equal(register_result.Ok.length, 63)

  const create_result = await alice.callSync('chat', 'create_stream', testNewChannelParams)
  console.log(create_result)
  t.deepEqual(create_result.Ok.length, 46)

  const get_all_members_result = await alice.callSync('chat', 'get_members', {stream_address: create_result.Ok})
  console.log('all members:', get_all_members_result)
  let allMembers = get_all_members_result.Ok
  t.true(allMembers.length > 0, 'gets at least one member')
  
  const get_result = await alice.callSync('chat', 'get_all_public_streams', {})
  console.log(get_result)
  t.deepEqual(get_result.Ok.length, 1)

})

scenario.runTape('Can post a message to the stream and retrieve', async (t, {alice}) => {

  const register_result = await alice.callSync('chat', 'register', {name: 'alice', avatar_url: ''})
  console.log(register_result)
  t.equal(register_result.Ok.length, 63)

  const create_result = await alice.callSync('chat', 'create_stream', testNewChannelParams)
  console.log(create_result)
  const stream_addr = create_result.Ok
  t.deepEqual(stream_addr.length, 46)

  const get_result = await alice.callSync('chat', 'get_all_public_streams', {})
  console.log(get_result)
  t.deepEqual(get_result.Ok.length, 1)

  const post_result = await alice.callSync('chat', 'post_message', {stream_address: stream_addr, message: testMessage})
  console.log(post_result)
  t.notEqual(post_result.Ok, undefined, 'post should return Ok')

  const get_message_result = await alice.callSync('chat', 'get_messages', {address: stream_addr})
  console.log(get_message_result)
  t.deepEqual(get_message_result.Ok[0].entry.payload, testMessage.payload, 'expected to receive the message back')
})

scenario.runTape('Can create a public stream with some members', async (t, {alice}) => {

  const register_result = await alice.callSync('chat', 'register', {name: 'alice', avatar_url: ''})
  console.log(register_result)
  t.equal(register_result.Ok.length, 63)

  const create_result = await alice.callSync('chat', 'create_stream', {...testNewChannelParams, public: false, initial_members: []})
  console.log(create_result)
  t.deepEqual(create_result.Ok.length, 46)

  const get_all_members_result = await alice.callSync('chat', 'get_members', {stream_address: create_result.Ok})
  console.log('all members:', get_all_members_result)
  let allMemberAddrs = get_all_members_result.Ok
  t.true(allMemberAddrs.length > 0, 'gets at least one member')
})
*/