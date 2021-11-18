import { RECEIVE_INVITES} from '../actions/friend_invites_actions';

const FriendInviteReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
      case RECEIVE_INVITES:
          return action.invites
        default:
        return state;
    }
  };
  
  export default FriendInviteReducer;