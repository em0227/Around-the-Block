import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateEvent, fetchEvent } from "../../actions/event_actions";
import CreateEventForm from "./create_event";
import { clearEventErrors } from "../../actions/event_actions";

const mapStateToProps = (state, ownProps) => ({
  errors: Object.values(state.errors.events),
  event: Object.values(state.events).filter(
    (event) => event._id === ownProps.match.params.eventId
  )[0], 
  formType: "update"
});

const mapDispatchToProps = () => (dispatch) => ({
  updateEvent: (event, history) => dispatch(updateEvent(event, history)),
  clearErrors: () => dispatch(clearEventErrors()),
  fetchEvent: (eventId) => dispatch(fetchEvent(eventId)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateEventForm)
);
