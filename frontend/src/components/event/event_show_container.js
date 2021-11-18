import { connect } from "react-redux";
import { fetchEvent, updateEvent } from "../../actions/event_actions";
import EventShow from "./event_show";
import { updateCurrentUser } from "../../actions/users_actions";

const mapStateToProps = (state, ownProps) => ({
  event: Object.values(state.events).filter(
    (event) => event._id === ownProps.match.params.eventId
  )[0],
  isAuthenticated: state.session.isAuthenticated,
  currentUser: state.session.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvent: (eventId) => dispatch(fetchEvent(eventId)),
  updateCurrentUser: (data) => dispatch(updateCurrentUser(data)),
  updateEvent: (event) => dispatch(updateEvent(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventShow);
