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

export default combineReducers({
  channels,
  users
})