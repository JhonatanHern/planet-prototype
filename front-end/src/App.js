import React from "react"
import { connect } from '@holochain/hc-web-client'

import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

class App extends React.Component {
    constructor(props){
        super(props)
        window.hc = this.makeHolochainCall
    }
    state = {
        hc : connect,
        logged : false,
        username : null
    }

    makeHolochainCall =  (functionName, params, callback) => {
        connect("ws://localhost:8888").then(({callZome, close}) => {
            callZome(/*'holo-chat'*/'test-instance', 'messaging' , functionName )( params ).then((result) => {
                callback(JSON.parse(result))
                close()
            })
        })
    }
    handleChange = e => {
        this.setState({username:e.target.value})
    }
    join = _ => {
        // this.setState({logged:true})
        this.makeHolochainCall('reee',{s:this.state.username},(result) => console.log(result))
    }
    render(){
        if(!this.state.logged){
            return (
                <div className='register-section'>
                    <input onChange={this.handleChange} placeholder="Insert your username"/>
                    <button onClick={this.join}>Join</button>
                </div>
            )
        }
        return (
            <div className="App">
                <Header hc={this.state.hc} />
                <Sidebar hc={this.state.hc} />
            </div>
        )
    }
}

export default App;
