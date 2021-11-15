// import { postUser, deleteSession, postSession } from '../utils/session';
import * as APIUtil from "../utils/session";
import jwt_decode from "jwt-decode";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_SIGNIN = "RECEIVE_USER_SIGNIN";

const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGNIN,
});

const logoutUser = () => ({
  type: RECEIVE_LOGOUT_USER,
});

const receiveSessionErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});
export const signup = (user) => (dispatch) => {
  return APIUtil.signup(user)
    .then(() => dispatch(receiveUserSignIn()))
    .catch((error) => dispatch(receiveSessionErrors(error.response.data)));
};

export const login = (user) => (dispatch) => {
  return APIUtil.login(user)
    .then((res) => {
      const { token } = res.data; //localStorage: save something on the clients side (bwt refresh,close the browser)
      localStorage.setItem("jwtToken", token); //defaults header for future call?
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch(receiveSessionErrors(err.response.data));
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken"); //defaults header for future call?
  APIUtil.setAuthToken(false);
  dispatch(logoutUser());
};

// export const logout = () => (dispatch) =>
//   deleteSession().then(() => dispatch(logoutCurrentUser()));
