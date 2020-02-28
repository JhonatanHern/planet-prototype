import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "../css/modal.css";
import hc from "../hc";
const onClick = entry => {
  hc({
    functionName: "join_channel",
    params: { entry },
    callback: result => {
      if (result.Ok) {
      } else {
        alert("error");
        console.log(result);
      }
    }
  });
};
const Modal = ({
  title,
  data,
  type,
  close,
  conversations,
  myChannels,
  channels,
  users
}) => (
  <div className="modal-base" onClick={close}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <span className="modal-close" onClick={close} />
      <h3>{title}</h3>
      <div className="modal-data">
        {data.length ? (
          type === "members" ? (
            data.map((d, i) => <div key={i}>{d.entry.username}</div>)
          ) : (
            //type === channels
            data.map((d, i) => (
              <div key={i} onClick={e => onClick(d.entry)}>
                {d.entry.title}
              </div>
            ))
          )
        ) : (
          <>No {type} available yet, stay tuned for updates!</>
        )}
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  title: PropTypes.string,
  close: PropTypes.func.isRequired,
  type: PropTypes.string,
  data: PropTypes.array
};

const mapDispatchToProps = dispatch => ({});
const mapStateToProps = ({ conversations, myChannels, channels, users }) => ({
  conversations,
  myChannels,
  channels,
  users
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
