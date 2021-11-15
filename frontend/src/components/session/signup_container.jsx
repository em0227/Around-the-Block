import { connect } from "react-redux";
import React from "react";
// import { Link } from "react-router-dom";
import { signup } from "../../actions/session_actions";
// import { openModal, closeModal } from "../../actions/modal_actions";
import Signup from "./signup";

const mapStateToProps = (state) => ({
    errors: state.errors.session,
    signedIn: state.session.isSignedIn
  });

const mapDispatchToProps = (dispatch) => ({
  signup: user => dispatch(signup(user)),
  // clearErrors: () => dispatch(clearSessionErrors()),
  // otherForm: (
  //   <button onClick={() => dispatch(openModal("login"))}>Log In</button>
  // ),
  // closeModal: () => dispatch(closeModal()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Signup);

