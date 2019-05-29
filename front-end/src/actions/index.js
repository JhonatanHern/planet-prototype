export default {
    loadChannels:(channels=[],dispatch)=>{
        dispatch({ type:'CHANNELS_UPDATE' , channels })
    },
    loadMyChannels:(channels=[],dispatch)=>{
        dispatch({ type:'MY_CHANNELS_UPDATE' , channels })
    },
    loadConversations:(channels=[],dispatch)=>{
        dispatch({ type:'CONVERSATIONS_UPDATE' , channels })
    },
    loadUsers:(users=[],dispatch)=>{
        dispatch({ type:'USERS_UPDATE' , users })
    },
    updateProfile:(profile={},dispatch)=>{
        dispatch({ type:'PROFILE_UPDATE' , profile })
    },
    loadCurrentChannel:(channel={},dispatch)=>{
        dispatch({ type:'UPDATE_CHANNEL' , channel })
    }
}