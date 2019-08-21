import React, { Component } from 'react'
import { Route , Switch , Link } from 'react-router-dom'

import MyCommunities from './Communities/MyCommunities'
import Default from './Communities/Default'
import Explore from './Communities/Explore'
import Search from './Communities/Search'
import Create from './Communities/Create'

import '../sass/communities.scss'

class Communities extends Component {
    render() {
        return (
            <div id='communities'>
                <div className='navigator'>
                    <Link to="/communities/create">
                        <span>+</span> New Community
                    </Link>
                    <Link to="/communities/my-commmunities">
                        My Communities
                    </Link>
                    <Link to="/communities/search">
                        Search
                    </Link>
                    <Link to="/communities/explore">
                        Explore
                    </Link>
                </div>
                <Switch>
                    <Route exact path='/communities/search' component={Search}/>
                    <Route exact path='/communities/my-commmunities' component={MyCommunities}/>
                    <Route exact path='/communities/create' component={Create}/>
                    <Route exact path='/communities/explore' component={Explore}/>
                    <Route component={Default} />
                </Switch>
            </div>
        )
    }
}


export default Communities
