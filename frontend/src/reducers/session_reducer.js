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
      // nextState.user.id = action.user.data._id
      // nextState.user.name = action.user.data.name
      // nextState.user.email = action.user.data.email
      // nextState.user.eventsHosted = action.user.data.eventsJoined
      nextState.user.friends = action.user.data.friends
      nextState.user.requestsSent = action.user.data.requestsSent
      nextState.user.requestsReceived = action.user.data.requestsReceived
      return nextState; 
    default:
      return state;
  }
}
export default SessionReducer;