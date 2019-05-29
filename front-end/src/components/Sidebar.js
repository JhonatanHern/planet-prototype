import React, { Component } from "react"
import NewGroup from "./NewGroup"
// import Me from "./Me"
// import User from "./User"

import { connect } from 'react-redux'
import "../css/sidebar.css"
import "../css/user.css"

import actions from '../actions'
import hc from "../hc";

const Label = ({name,title,onClick}) => (
    <div className="user" onClick={onClick}>
        <div className="circle">{name && name[0].toUpperCase()}</div>
        <span className="text">{name}</span>
    </div>
)

class Sidebar extends Component {
    constructor(props){
        super(props)
        this.updateAll()
    }
    updateMyChannels = () => {
        hc({
            functionName : 'get_my_channels',
            callback : data => {
                this.props.loadMyChannels(data.Ok)
            }
        })
    }
    updateChannels = () => {
        hc({
            functionName : 'get_all_channels',
            callback : data => {
                this.props.loadChannels(data.Ok)
            }
        })
    }
    updateConversations = () => {
        hc({
            functionName : 'get_my_conversations',
            callback : data => {
                this.props.loadConversations(data.Ok)
            }
        })
    }
    updateUsers = () => {
        hc({
            functionName : 'get_all_users',
            callback : data => {
                this.props.loadUsers(data.Ok)
            }
        })
    }
    updateAll = () => {
        this.updateMyChannels()
        //this.updateConversations()
    }
    clickUser = e => {}
    clickChannel = channel => {
        this.props.loadCurrentChannel(channel)
    }
    createChannel = () => {
        let name = prompt('insert the name of the channel')
        if ( !name ) {
            return
        }
        hc({
            functionName : 'create_channel',
            params : {
                entry:{
                    title : name,
                    description : 'default description',
                }
            },
            callback : res => {
                console.log(res)
                setTimeout(()=>{
                    this.updateMyChannels()
                },300)
                this.updateMyChannels()
            }
        })
    }
    render() {
        return (
            <div className="sidebar">
                <NewGroup onClick={this.createChannel}/>
                <button className='reloader' onClick={this.updateAll}>
                    <span role="img" aria-label=''>🔄</span> Update
                </button>
                <div className="chats">
                    <div className="divider">My Channels</div>
                    {
                        this.props.myChannels &&
                        this.props.myChannels.length > 0 &&
                        this.props.myChannels.map((c,i)=><Label key={i} name={c.entry.title} onClick={e=>this.clickChannel(c)} />)
                    }
                    <div className='join'>Join a channel!</div>
                    <div className="divider">Conversations</div>
                    {
                        this.props.conversations &&
                        this.props.conversations.length > 0 &&
                        this.props.conversations.map((u,i)=><Label key={i} name={u.entry.username} onClick={this.clickUser} />)
                    }
                    <div className='join'>Start a conversation!</div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({conversations, myChannels}) => ({conversations,myChannels})

const mapDispatchToProps = dispatch => ({
    loadMyChannels: data => actions.loadMyChannels(data, dispatch),
    loadChannels: data => actions.loadChannels(data, dispatch),
    loadConversations: data => actions.loadConversations(data, dispatch),
    loadUsers: data => actions.loadUsers(data, dispatch),
    loadCurrentChannel: data => actions.loadCurrentChannel(data, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar)