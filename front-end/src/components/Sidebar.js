import React, { Component } from "react"
import NewGroup from "./NewGroup"
// import Me from "./Me"
// import User from "./User"

import { connect } from 'react-redux'
import "../css/sidebar.css"
import "../css/user.css"

import actions from '../actions'
import hc from "../hc";

const Label = ({name}) => (
    <div className="user">
        <div className="circle">{name[0].toUpperCase()}</div>
        <span className="text">{name}</span>
    </div>
)

class Sidebar extends Component {
    constructor(props){
        super(props)
        this.updateAll()
    }
    updateChannels = () => {
        hc({
            functionName : 'get_all_channels',
            callback : data => {
                this.props.loadChannels(data.Ok)
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
        this.updateChannels()
        this.updateUsers()
    }
    clickUser = e =>{}
    clickChannel = e =>{}
    render() {
        return (
            <div className="sidebar">
                <NewGroup/>
                <button className='reloader' onClick={this.updateAll}>
                    <span role="img" aria-label=''>🔄</span> Update
                </button>
                <div className="chats">
                    <div className="divider">My Channels</div>
                    {
                        this.props.channels &&
                        this.props.channels.length > 0 &&
                        this.props.channels.map((c,i)=><Label key={i} name={c.title} onClick={this.clickChannel} />)
                    }
                    <div className='join'>Join a channel!</div>
                    <div className="divider">Conversations</div>
                    {
                        this.props.users &&
                        this.props.users.length > 0 &&
                        this.props.users.map((u,i)=><Label key={i} name={u.entry.username} onClick={this.clickUser} />)
                    }
                    <div className='join'>Start a conversation!</div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({channels,users}) => ({channels,users})

const mapDispatchToProps = dispatch => ({
    loadChannels: data => actions.loadChannels(data, dispatch),
    loadUsers: data => actions.loadUsers(data, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar)