import React, { Component } from "react";
import NewGroup from "./NewGroup";
import Me from "./Me";
import User from "./User";

import "../css/sidebar.css";

export default class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <NewGroup />

                <div className="users">
                    <Me />
                    <div className="divider">Channels</div>
                    <User />
                    <User />
                    <User />
                    <div className="divider">Users</div>
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                </div>
            </div>
        );
    }
}
