import * as SessionAPIUtil from "../util/session_api_util";

export const RECEIVE_USERS = "RECEIVE_USERS";


export const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
  });

export const fetchUsers = () => dispatch => (
    SessionAPIUtil.fetchUsers().then(
        (users) => dispatch(receiveUsers(users.data))
    )
)