import { connect } from "react-redux";
import React from "react";
import { login, clearSessionErrors } from "../../actions/session_actions";
import SessionForm from "./session_form";
import { openModal, closeModal } from "../../actions/modal_actions";


const mapStateToProps = ({ errors }) => ({
    errors: errors.session,
    formType: "login",
  });

const mapDispatchToProps = (dispatch) => ({
  processForm: (user) => dispatch(login(user)),
  clearErrors: () => dispatch(clearSessionErrors()),
  otherForm: (
    <button onClick={() => dispatch(openModal("signup"))}>Sign up</button>
  ),
  closeModal: () => dispatch(closeModal()),
  openModal: modal => dispatch(openModal(modal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
