import { combineReducers } from "redux";
import sessionReducer from "./session_reducer";
// import entitiesReducer from "./entities_reducer";
import errorsReducer from "./errors_reducer";
import EventsReducer from "./event_reducer";
import UiReducer from "./ui_reducer";
import FriendRequestReducer from "./requests_reducer";
import FriendInviteReducer from "./invites_reducer";
import UsersReducer from "./users_reducer";
import FiltersReducer from "./filters_reducer"

const RootReducer = combineReducers({
  // entities: entitiesReducer,
  session: sessionReducer,
  errors: errorsReducer,
  events: EventsReducer,
  ui: UiReducer, 
  requests: FriendRequestReducer,
  invites: FriendInviteReducer,
  users: UsersReducer,
  filters: FiltersReducer
});

export default RootReducer;
