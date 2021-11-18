import * as FriendRequestAPIUtil from "../util/friend_request_util";
import jwt_decode from "jwt-decode";
import { RECEIVE_FRIEND, UPDATE_FRIEND} from '../actions/event_actions';

const FriendRequestReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
      case RECEIVE_FRIEND:
          nextState[action.friend.id] = friend
        default:
        return state;
    }
  };
  
  export default FriendRequestReducer;