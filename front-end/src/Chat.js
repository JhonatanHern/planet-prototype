import React from "react";
import { connect } from "react-redux";

import actions from "./actions";
import Sidebar from "./components/Sidebar";

import "./css/profile_popup.css";
import InternalChat from "./components/InternalChat";
import Modal from "./components/Modal";
import hc from "./hc";
class Chat extends React.Component {
  closeModal = () => {
    this.props.closeModal();
  };
  componentDidMount() {
    this.all();
  }

  all = () => {
    hc({
      functionName: "get_all_channels",
      callback: data => {
        this.data = data.Ok;
      }
    });
  };
  render() {
    return (
      <>
        <main>
          <Sidebar />
          <InternalChat />
        </main>
        {this.props.modal === "DISPLAY_CHANNELS" && (
          <Modal
            title="Channels"
            close={this.closeModal}
            type="channels"
            data={this.data ? this.data : []}
          />
        )}
        {this.props.modal === "DISPLAY_CONVERSATIONS" && (
          <Modal
            title="Members"
            close={this.closeModal}
            type="members"
            data={[]}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = ({ modal }) => ({
  modal
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => actions.closeModal(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
