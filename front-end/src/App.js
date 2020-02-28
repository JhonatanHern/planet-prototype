import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Chat from "./Chat";
import Header from "./components/Header";
import hc from "./hc";
import actions from "./actions";
import Profile from "./components/Profile";
import Communities from "./components/Communities";

class App extends Component {
  constructor(props) {
    super(props);
    hc({
      functionName: "check_register",
      callback: data => {
        if (data && data.Ok && data.Ok.registered) {
          let me = JSON.parse(data.Ok.me.App[1]);
          this.props.updateProfile(me);
          this.setState({ logged: true });
        }
      }
    });
  }
  state = {
    logged: false,
    username: null
  };
  handleUsernameChange = e => {
    this.setState({
      username: e.target.value
    });
    if (e.keyCode === 13) {
      this.join(e.target.value);
    }
  };

  join = username => {
    hc({
      functionName: "create_user",
      params: { username },
      callback: result => {
        if (result.Ok) {
          this.props.updateProfile({ username });
        } else {
          alert("error");
          console.log(result);
        }
      }
    });
  };
  render() {
    if (!this.props.me) {
      return (
        <div className="register-section">
          <h3>Welcome to Planet Chat!</h3>
          <input
            onKeyDown={this.handleUsernameChange}
            placeholder="Insert your username"
          />
          <button
            onClick={e => {
              this.join(this.state.username);
            }}
          >
            Join
          </button>
        </div>
      );
    }
    return (
      <>
        <Header />
        <Switch>
          <Route path="/chat" component={Chat} />
          <Route path="/profile" component={Profile} />
          <Route path="/communities" component={Communities} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = ({ currentApp, me }) => ({
  currentApp,
  me
});

const mapDispatchToProps = dispatch => ({
  updateProfile: data => actions.updateProfile(data, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
