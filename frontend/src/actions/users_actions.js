import jwt_decode from "jwt-decode";
import * as Session from "./session_actions";
import * as UserAPIUtil from "../util/user_api_util";
import * as SessionAPIUtil from "../util/session_api_util";
import {receiveUpdatedUser} from "./friend_request_actions"
export const RECEIVE_USER_ERROR = "RECEIVE_USER_ERROR";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_FILTERED_USERS = "RECEIVE_FILTERED_USERS";



export const receiveUserErrors = (errors) => ({
  type: RECEIVE_USER_ERROR,
  errors,
});

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users
});

export const receiveFilteredUsers = (users) => ({
  type: RECEIVE_FILTERED_USERS,
  users
});

export const fetchCurrentUser = () => (dispatch) =>
  UserAPIUtil.fetchCurrentUser().then(
    (user) => dispatch(Session.receiveCurrentUser(user.data)),
    (err) => dispatch(receiveUserErrors(err.response.data))
  );

export const updateCurrentUser = (userData) => (dispatch) =>
  UserAPIUtil.updateCurrentUser(userData).then(
    (user) => dispatch(receiveUpdatedUser(user)),
    (err) => dispatch(receiveUserErrors(err.response.data))
  );

export const fetchUsers = () => dispatch => (
    SessionAPIUtil.fetchUsers().then(
        (users) => dispatch(receiveUsers(users.data))
    )
)

export const fetchFilteredUsers = (name) => dispatch => (
  UserAPIUtil.getFilteredUsers(name).then(
      (users) => dispatch(receiveFilteredUsers(users.data)))
  )

export const deleteFriend = (friendId) => (dispatch) => (
  UserAPIUtil.deleteFriend(friendId).then(
    user => dispatch(receiveUpdatedUser(user))
  )
)



  export const fetchDemoUser = () => (dispatch) =>
  UserAPIUtil.getDemoUser()
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      SessionAPIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(Session.receiveCurrentUser(decoded));
    })
    

