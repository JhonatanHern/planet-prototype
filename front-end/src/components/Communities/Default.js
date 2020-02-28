import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Default extends Component {
    render() {
        return (
            <div className='default'>
                <h2>Oops, this community has not been created!</h2>
                <Link to='/communities/create'>Create it!</Link>
            </div>
        )
    }
}
