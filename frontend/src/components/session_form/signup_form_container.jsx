import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { signup, clearSessionErrors } from "../../actions/session_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import SessionForm from "./session_form";

const mapStateToProps = ({ errors }) => ({
    errors: errors.session,
    formType: "signup",
  });

const mapDispatchToProps = (dispatch) => ({
  processForm: (user) => dispatch(signup(user)),
  clearErrors: () => dispatch(clearSessionErrors()),
  otherForm: (
    <button onClick={() => dispatch(openModal("login"))}>Log In</button>
  ),
  closeModal: () => dispatch(closeModal()),
});


export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);

