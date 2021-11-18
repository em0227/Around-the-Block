import { connect } from "react-redux";
import { fetchEvents } from "../../actions/event_actions";

import UserProfile from "./user_profile";

const mapStateToProps = (state) => ({
  events: Object.values(state.events),
  currentUser: state.session
  // event: state.entities.events[ownProps.match.params.eventId]
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(fetchEvents()),
  // fetchEvent: eventId => dispatch(fetchEvent(eventId))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
