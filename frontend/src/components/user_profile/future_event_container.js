import { connect } from "react-redux";
import { fetchCurrentUser } from "../../actions/users_actions";
import {
  fetchEvents,
  updateEvent,
  deleteEvent,
  leaveEvent,
} from "../../actions/event_actions";
import {
  receiveInvites,
  updateFriend,
} from "../../actions/friend_invites_actions";
import {
  fetchFriendRequests,
  createFriendRequest,
} from "../../actions/friend_request_actions";
import { fetchUsers } from "../../actions/users_actions";
import { fetchFilteredUsers } from "../../actions/users_actions";
import FutureEvent from "./future_event";

const mapStateToProps = (state) => ({
  currentUser: state.session,
  events: Object.values(state.events),
  currentUser: state.session.user,
  users: state.users,
  invites: state.invites,
  preJoinedEvent: state.ui.preJoinedEvent,
  requests: state.requests,
  filters: state.filters,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  fetchEvents: () => dispatch(fetchEvents()),
  receiveInvites: () => dispatch(receiveInvites()),
  fetchFriendRequests: () => dispatch(fetchFriendRequests()),
  createFriendRequest: (friendId) => dispatch(createFriendRequest(friendId)),
  updateFriend: (request) => dispatch(updateFriend(request)),
  fetchUsers: () => dispatch(fetchUsers()),
  updateEvent: (event) => dispatch(updateEvent(event)),
  fetchFilteredUsers: (filter) => dispatch(fetchFilteredUsers(filter)),
  deleteEvent: (eventId) => dispatch(deleteEvent(eventId)),
  leaveEvent: (event) => dispatch(leaveEvent(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FutureEvent);
