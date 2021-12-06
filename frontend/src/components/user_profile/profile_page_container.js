import { connect } from "react-redux";
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
  fetchCurrentUser,
  fetchFilteredUsers,
  updateCurrentUser,
  deleteFriend
} from "../../actions/users_actions";
import ProfilePage from "./profile_page";

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
  deleteFriend: (friendId) => dispatch(deleteFriend(friendId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
