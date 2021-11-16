// import { RECEIVE_CURRENT_USER, RECEIVE_USER_LOGOUT } from "../actions/session";

// const _nullSession = {
//   currentUser: null,
// };

// export default (state = _nullSession, action) => {
//   Object.freeze(state);
//   switch (action.type) {
//     case RECEIVE_CURRENT_USER:
//       const currentUser = action.user;
//       return Object.assign({}, { currentUser });
//     case RECEIVE_USER_LOGOUT:
//       return _nullSession;
//     default:
//       return state;
//   }
// };
import { combineReducers } from "redux";
import usersReducer from "./users_reducer";


export default combineReducers({
  users: usersReducer,
});
