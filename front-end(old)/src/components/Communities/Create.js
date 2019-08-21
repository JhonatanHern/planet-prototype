import React, { Component } from 'react'
import { connect } from 'react-redux'

class Create extends Component {
    state = {
        title:'',
        description:'',
        keywords:''
    }
    change = e => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() {
        return (
            <div className='create'>
                <h3>Create Community</h3>
                <form>
                    <label>Name</label>
                    <input name='name' onChange={this.change} />
                    <label>Keywords (separate with commas)</label>
                    <input name='keywords' onChange={this.change} />
                    <label>Description</label>
                    <textarea name='description' onChange={this.change} />
                    <button>Create</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = () => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Create)
