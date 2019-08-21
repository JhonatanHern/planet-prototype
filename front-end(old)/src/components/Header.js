import React from "react"
    import { Link } from 'react-router-dom'

import "../css/header.css"

class Header extends React.Component {
    menuClick = e => {
        e.preventDefault()
        this.props.selectApp(e.target.getAttribute('app'))
    }
    render(){
        return (
            <header>
                <div>
                    <img
                        alt="Planet"
                        src='/img/Proposal of graphic identidy planet-09.png'
                        className="logo"
                    />
                </div>

                <div className="links">
                    <Link to='/chat' className='link'>
                        Chat
                    </Link>
                    <Link to='/communities/search' className='link'>
                        Communities
                    </Link>
                    <Link to="/profile" className="link">
                        User
                    </Link>
                </div>
            </header>
        )
    }
}

export default Header