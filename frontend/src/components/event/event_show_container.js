import { connect } from "react-redux";
import {fetchEvent } from "../../actions/event_actions";
import EventShow from "./event_show";

const mapStateToProps = (state, ownProps) => {
    console.log(state)
  return {event: state.events[ownProps.match.params.eventId]}
};

const mapDispatchToProps = (dispatch) => ({
  fetchEvent: eventId => dispatch(fetchEvent(eventId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventShow);

