import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGN_IN,
} from "../actions/session_actions";

import {
  RECEIVE_UPDATED_USER
} from "../actions/friend_request_actions"

const initialState = {
  isAuthenticated: false,
  user: {},
};

const SessionReducer = (state = initialState, action) => {
  Object.freeze(state)
  const nextState = Object.assign({}, state)
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser,
      };
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined,
      };
    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
      };
    case RECEIVE_UPDATED_USER:
      console.log(action.user)
    default:
      return state;
  }
}
export default SessionReducer;