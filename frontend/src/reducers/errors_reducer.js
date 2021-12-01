import { combineReducers } from "redux";
import EventErrorsReducer from "./event_errors_reducer";

import SessionErrorsReducer from "./session_errors_reducer";
import users from "./users_errors_reducer";
import FriendErrorsReducer from "./friend_errors_reducer"

export default combineReducers({
  session: SessionErrorsReducer,
  users,
<<<<<<< HEAD
  events: EventErrorsReducer,
=======
  friends: FriendErrorsReducer
>>>>>>> snigdha_finishing_friend_requests
});
