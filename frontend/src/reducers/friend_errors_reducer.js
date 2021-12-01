import {
    RECEIVE_FRIEND_ERRORS,
    RECEIVE_UPDATED_USER
  } from "../actions/friend_request_actions";
  
  const _nullErrors = [];
  
  const FriendErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
    case RECEIVE_UPDATED_USER:
        return _nullErrors;
    case RECEIVE_FRIEND_ERRORS:
        return action.errors;
      default:
        return state;
    }
  };
  
  export default FriendErrorsReducer;