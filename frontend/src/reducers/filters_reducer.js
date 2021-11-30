import { RECEIVE_FILTERED_USERS} from '../actions/users_actions'

const FiltersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
      case RECEIVE_FILTERED_USERS:
          return action.users
        default:
        return state;
    }
  };
  
  export default FiltersReducer;