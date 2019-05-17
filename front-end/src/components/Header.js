import React, { Component } from "react";
import "../css/header.css";
export default class Header extends Component {
    render() {
        return (
            <header>
                <div>
                    <img
                        alt="Planet"
                        src={require("../img/Proposal of graphic identidy planet-09.png")}
                        className="logo"
                    />
                </div>

                <div className="links">
                    <a href="/" className="link">
                        Community
                    </a>
                    <a href="/" className="link">
                        Exchange
                    </a>
                    <a href="/" className="link">
                        User
                    </a>
                </div>
            </header>
        );
    }
}
