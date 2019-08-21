import React, { Component } from 'react'
import { connect } from 'react-redux'

import CommunityList from './CommunityList'

const dummyData = [
    {
        title:'title 1',
        address:'8926b1f7bdd8f5b949029b34e21244ef',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
    },
    {
        title:'title 2',
        address:'8926b1f7bdd8f5b949029b34e21244ef',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
    },
    {
        title:'unnecesarily extra long title number one I need ideas help',
        address:'8926b1f7bdd8f5b949029b34e21244ef',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
    },
    {
        title:'unnecesarily extra long title number two I need ideas help',
        address:'8926b1f7bdd8f5b949029b34e21244ef',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
    },
    {
        title:'unnecesarily extra long title number three I need ideas help',
        address:'8926b1f7bdd8f5b949029b34e21244ef',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`
    }
]

class Explore extends Component {
    render() {
        return (
            <div className='explore'>
                <h2>Popular communities</h2>
                <CommunityList communities={dummyData}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore)
