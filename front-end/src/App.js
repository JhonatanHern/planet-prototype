import React from "react"

import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

import hc from './hc'

import "./css/profile_popup.css"

class App extends React.Component {
    constructor(props){
        super(props)
        hc({
            functionName:'check_register',
            callback: data=>{
                if (data && data.Ok && data.Ok.registered) {
                    let me = JSON.parse(data.Ok.me.App[1])
                    this.setState({logged:true})
                }
            }
        })
    }
    state = {
        logged : false,
        username : null
    }
    handleUsernameChange = e => {
        this.setState({
            username: e.target.value
        })
        if ( e.keyCode === 13 ){
            this.join(e.target.value)
        }
    }
    join = username => {
        hc({
            functionName: 'create_user',
            params: {
                username: username
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
                    <input onKeyDown={this.handleUsernameChange} placeholder="Insert your username"/>
                    <button onClick={e=>this.join(this.state.username)}>Join</button>
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
