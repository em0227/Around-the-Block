import * as FriendRequestAPIUtil from "../util/friend_request_util";
import jwt_decode from "jwt-decode";
import { RECEIVE_REQUEST, RECEIVE_REQUESTS, UPDATE_FRIEND} from '../actions/event_actions';

const FriendRequestReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
      case RECEIVE_REQUEST:
          nextState[action.request._id] = request
      case RECEIVE_REQUESTS:
            return action.requests
        default:
        return state;
    }
  };
  
  export default FriendRequestReducer;