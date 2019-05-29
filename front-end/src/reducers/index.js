import { combineReducers } from 'redux'

function channels( channels = [] , action ){
    console.log(action.type,action)
    if (action.type !== 'CHANNELS_UPDATE') {
        return channels
    }
    return action.channels
}

function users(users=[],action) {
    if (action.type !== 'USERS_UPDATE') {
        return users
    }
    return action.users
}
function conversations(users=[], action) {
    if (action.type !== 'CONVERSATIONS_UPDATE') {
        return users
    }
    return action.users
}
function myChannels(channels=[], action) {
    if (action.type !== 'MY_CHANNELS_UPDATE') {
        return channels
    }
    return action.channels
}

function me(profile=null, action) {
    if (action.type !== 'PROFILE_UPDATE') {
        return profile
    }
    return action.profile
}
function messages(messages=[], action) {
    if (action.type !== 'UPDATE_MESSAGES') {
        return messages
    }
    return action.messages
}
function currentChannel(cc = null ,action) {
    if (action.type !== 'UPDATE_CHANNEL') {
        return cc
    }
    return action.channel
}
function chat(chat=null,action) {
    if (action.type !== 'UPDATE_CHAT') {
        return chat
    }
    return action.chat
}
export default combineReducers({
    currentChannel,
    conversations,
    myChannels,
    channels,
    messages,
    users,
    chat,
    me
})