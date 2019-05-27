import React, { Component } from "react"
import NewGroup from "./NewGroup"
// import Me from "./Me"
// import User from "./User"

import { connect } from 'react-redux'
import "../css/sidebar.css"

import actions from '../actions'

const Label = ({name}) => (
    <div className="user">
        <div className="circle" />
        <span className="text">{name}</span>
    </div>
);

class Sidebar extends Component {
    updateChannels = () => {

    }
    updateUsers = () => {}
    updateAll = () => {
        this.updateChannels()
        this.updateUsers()
    }
    render() {
        return (
            <div className="sidebar">
                <NewGroup />

                <div className="users">
                    <div className="divider">Channels</div>
                    {
                        (this.props.channels && this.props.channels.length) ?
                            this.props.channels.map(c=><Label name={c.title} />)
                        :
                            <>No channels registered yet</>
                    }
                    <div className="divider">Users</div>
                    {
                        (this.props.users && this.props.users.length) ?
                            this.props.users.map(u=><Label name={u.username} />)
                        :
                            <>No users registered yet</>
                    }
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({channels,users}) => ({
    channels,
    users
})

const mapDispatchToProps = dispatch => ({
    loadChannels: data => actions.loadChannels(data, dispatch),
    loadUsers: data => actions.loadUsers(data, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar)