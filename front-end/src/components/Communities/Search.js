import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommunityList from './CommunityList';

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

class Search extends Component {
    state = {
        searching:false,
        searchWord:''
    }
    search = () => {
        this.setState({
            searching: true
        })
    }
    handleSearchEvent = (e) => {
        if ( e.keyCode ) {//is a keyboard event
            this.setState({
                searchWord: e.target.value,
                searching: !! e.target.value
            })
            if( e.keyCode === 13 ){//enter
                this.search()
            }
        }else{//is a click in the search icon
            this.search()
        }
    }
    render() {
        return (
            <>
                <div className={this.state.searching?'searching search':'search'}>
                    <h1>Explore Communities</h1>
                    <div>
                        <input onKeyUp={this.handleSearchEvent}/>
                        <button onClick={this.handleSearchEvent}>
                            <span aria-label='search' role='img'>🔍</span>
                        </button>
                    </div>
                </div>
                <section className={this.state.searching?'search-results searching':'search-results'}>
                    {
                        this.state.searchWord &&
                        <>
                            Search results for: {this.state.searchWord}
                            <CommunityList communities={dummyData}  />
                        </>
                    }
                </section>  
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
