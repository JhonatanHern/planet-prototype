import React from "react"
import { connect } from '@holochain/hc-web-client'

import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

import "./css/profile_popup.css"

const is_the_connection_a_test = true

class App extends React.Component {
    constructor(props){
        super(props)
        window.hc = this.makeHolochainCall
        this.makeHolochainCall({
            functionName:'check_register',
            callback: data=>{
                if (data && data.Ok && data.Ok.registered) {
                    this.setState({logged:true})
                }
            }
        })
    }
    state = {
        hc : connect,
        logged : false,
        username : null
    }

    makeHolochainCall =  ({ functionName , params = {} , callback = _ => {} }) => {
        connect("ws://localhost:8888").then(({callZome, close}) => {
            callZome(is_the_connection_a_test?'test-instance':'holo-chat','messaging' , functionName )( params ).then((result) => {
                callback(JSON.parse(result))
                close()
            })
        })
    }
    handleUsernameChange = e => {
        this.setState({username:e.target.value})
    }
    join = _ => {
        this.makeHolochainCall({
            functionName: 'create_user',
            params: {
                username: this.state.username
            },
            callback: (result) =>{
                if(result.Ok){
                    this.setState({logged:true})
                }else{
                    alert('error')
                    console.log(result)
                }
            }
        })
    }
    render(){
        if(!this.state.logged){
            return (
                <div className='register-section'>
                    <h3>Welcome to Planet Chat!</h3>
                    <input onChange={this.handleUsernameChange} placeholder="Insert your username"/>
                    <button onClick={this.join}>Join</button>
                </div>
            )
        }
        return (
            <>
                <Header/>
                <main>
                    <Sidebar />
                </main>
            </>
        )
    }
}

export default App;
