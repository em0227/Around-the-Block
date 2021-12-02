import { connect } from "react-redux";
import { fetchCurrentUser } from "../../actions/users_actions";
import {
  fetchEvents,
  updateEvent,
  deleteEvent,
  leaveEvent,
} from "../../actions/event_actions";
import {
  fetchFriendRequests,
  createFriendRequest,
  updateFriend,
} from "../../actions/friend_request_actions";
import {
  fetchFilteredUsers,
  updateCurrentUser,
} from "../../actions/users_actions";
import FutureEvent from "./future_event";

const mapStateToProps = (state) => ({
  events: Object.values(state.events),
  currentUser: state.session.user,
  preJoinedEvent: state.ui.preJoinedEvent,
  requests: state.requests,
  filters: state.filters,
  errors: state.errors.friends,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  fetchEvents: () => dispatch(fetchEvents()),
  fetchFriendRequests: () => dispatch(fetchFriendRequests()),
  createFriendRequest: (friendId) => dispatch(createFriendRequest(friendId)),
  updateFriend: (request) => dispatch(updateFriend(request)),
  updateCurrentUser: (data) => dispatch(updateCurrentUser(data)),
  updateEvent: (event) => dispatch(updateEvent(event)),
  fetchFilteredUsers: (filter) => dispatch(fetchFilteredUsers(filter)),
  deleteEvent: (eventId) => dispatch(deleteEvent(eventId)),
  leaveEvent: (event) => dispatch(leaveEvent(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FutureEvent);
