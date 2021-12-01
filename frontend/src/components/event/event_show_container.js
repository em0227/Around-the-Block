import { connect } from "react-redux";
import { fetchEvent, updateEvent } from "../../actions/event_actions";
import EventShow from "./event_show";
import { fetchUsers } from "../../actions/users_actions";
import { joinPreJoinedEvent } from "../../actions/ui_actions";

const mapStateToProps = (state, ownProps) => ({
  event: Object.values(state.events).filter(
    (event) => event._id === ownProps.match.params.eventId
  )[0], 
  isAuthenticated: state.session.isAuthenticated,
  currentUser: state.session.user,
  preJoinedEvent: state.ui.preJoinedEvent,

  // users: state.users
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvent: (eventId) => dispatch(fetchEvent(eventId)),
  updateEvent: (event) => dispatch(updateEvent(event)),
  joinPreJoinedEvent: (eventId) => dispatch(joinPreJoinedEvent(eventId)),
  fetchUsers: () => dispatch(fetchUsers()),

});

export default connect(mapStateToProps, mapDispatchToProps)(EventShow);
