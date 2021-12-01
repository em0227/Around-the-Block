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
  updateFriend
} from "../../actions/friend_request_actions";
import { fetchFilteredUsers } from "../../actions/users_actions";
import FutureEvent from "./future_event";

const mapStateToProps = (state) => ({
  events: Object.values(state.events),
<<<<<<< HEAD
  currentUser: state.session.user,
  users: state.users,
  invites: state.invites,
  preJoinedEvent: state.ui.preJoinedEvent,
  requests: state.requests,
  filters: state.filters,
=======
  currentUser: state.session,
  preJoinedEvent: state.ui.preJoinedEvent,
  requests: state.requests,
  filters: state.filters,
  errors: state.errors.friends
>>>>>>> snigdha_finishing_friend_requests
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  fetchEvents: () => dispatch(fetchEvents()),
  fetchFriendRequests: () => dispatch(fetchFriendRequests()),
  createFriendRequest: (friendId) => dispatch(createFriendRequest(friendId)),
  updateFriend: (request) => dispatch(updateFriend(request)),
<<<<<<< HEAD
  fetchUsers: () => dispatch(fetchUsers()),
=======
  updateCurrentUser: (data) => dispatch(updateCurrentUser(data)),
>>>>>>> snigdha_finishing_friend_requests
  updateEvent: (event) => dispatch(updateEvent(event)),
  fetchFilteredUsers: (filter) => dispatch(fetchFilteredUsers(filter)),
  deleteEvent: (eventId) => dispatch(deleteEvent(eventId)),
  leaveEvent: (event) => dispatch(leaveEvent(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FutureEvent);
