export default {
    loadChannels:(channels=[],dispatch)=>{
        dispatch({ type:'CHANNELS_UPDATE' , channels })
    },
    loadUsers:(users=[],dispatch)=>{
        dispatch({ type:'USERS_UPDATE' , users })
    }
}