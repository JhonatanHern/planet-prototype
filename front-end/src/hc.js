import { connect } from "@holochain/hc-web-client";

const is_the_connection_a_test = false;

const is_dev_mode =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export default ({ functionName, params = {}, callback = _ => {} }) => {
  // let promise;
  // if (is_dev_mode) {
  //   // dev code
  //   promise = connect("ws://localhost:8080");
  // } else {
  //   // production code
  //   promise = connect();
  // }
  connect({ url: "ws://0.0.0.0:8080" })
    .then(({ callZome, close }) => {
      callZome(
        //is_the_connection_a_test && is_dev_mode ? "test-instance" : "holo-chat",
        "holo-chat",
        "messaging",
        functionName
      )(params).then(result => {
        console.log(result);
        result = JSON.parse(result);
        console.log(`HC CALL: ${functionName}, received `, result);
        callback(result);
        close();
      });
    })
    .catch(e => console.log(e));
};
