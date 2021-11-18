import { connect } from "react-redux";
import { fetchEvents } from "../../actions/event_actions";
import { receiveInvites } from "../../actions/friend_invites_actions";
import { fetchFriendRequests } from "../../actions/friend_request_actions";
import { createFriendRequest } from "../../actions/friend_request_actions";
import { fetchUsers } from "../../util/session_api_util";


import UserProfile from "./user_profile";

const mapStateToProps = (state) => ({
  events: Object.values(state.events),
  currentUser: state.session
  // event: state.entities.events[ownProps.match.params.eventId]
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(fetchEvents()),
  receiveInvites: () => dispatch(receiveInvites()),
  fetchFriendRequests: () => dispatch(fetchFriendRequests()),
  createFriendRequest: (friendId) => dispatch(createFriendRequest(friendId)),
  fetchUsers: () => dispatch(fetchUsers())

  // fetchEvent: eventId => dispatch(fetchEvent(eventId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
