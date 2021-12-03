import { connect } from "react-redux";
import { login} from "../../actions/session_actions";
import LoginForm from "./login";
import { clearSessionErrors } from "../../actions/session_actions";

import {fetchDemoUser} from "../../actions/users_actions"

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    clearSessionErrors: () => dispatch(clearSessionErrors()),
    fetchDemoUser: () => dispatch(fetchDemoUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
