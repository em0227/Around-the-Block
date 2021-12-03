import { connect } from "react-redux";
import { signup } from "../../actions/session_actions";
import SignupForm from "./signup";
import { clearSessionErrors } from "../../actions/session_actions";

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (user, history) => dispatch(signup(user, history)),
    clearSessionErrors: () => dispatch(clearSessionErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
