/**
 * Created by chenlizan on 2017/6/18.
 */

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Login from "../views/Login";
import { login_requested_creator, startListener, stopListener } from "../action/index";

function mapStateToProps(state) {
  return {
    account: state.Login.account,
    result: state.Login.result,
    secs: state.Login.secs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleLoginRequested: bindActionCreators(login_requested_creator, dispatch),
    handleStartListener: bindActionCreators(startListener, dispatch),
    handleStopListener: bindActionCreators(stopListener, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
