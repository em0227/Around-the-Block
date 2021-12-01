import { connect } from "react-redux";
import { fetchEvent, updateEvent } from "../../actions/event_actions";
import EventShow from "./event_show";
import { updateCurrentUser,fetchUsers } from "../../actions/users_actions";
import { joinPreJoinedEvent } from "../../actions/ui_actions";

const mapStateToProps = (state, ownProps) => ({
  event: Object.values(state.events).filter(
    (event) => event._id === ownProps.match.params.eventId
  )[0], 
  isAuthenticated: state.session.isAuthenticated,
  currentUser: state.session.user,
  preJoinedEvent: state.ui.preJoinedEvent,

<<<<<<< HEAD
  users: state.users
=======
  // users: state.users
>>>>>>> 2d7c7c87f02860a8aa9ce24f169d909cbc5fe8ab
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvent: (eventId) => dispatch(fetchEvent(eventId)),
  updateCurrentUser: (data) => dispatch(updateCurrentUser(data)),
  updateEvent: (event) => dispatch(updateEvent(event)),
  joinPreJoinedEvent: (eventId) => dispatch(joinPreJoinedEvent(eventId)),
  fetchUsers: () => dispatch(fetchUsers()),

});

export default connect(mapStateToProps, mapDispatchToProps)(EventShow);
