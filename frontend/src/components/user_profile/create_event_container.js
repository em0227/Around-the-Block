import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createEvent } from "../../actions/event_actions";
import CreateEventForm from "./create_event";
import { clearEventErrors } from "../../actions/event_actions";

const mapStateToProps = (state) => ({
  errors: Object.values(state.errors.events),
});

const mapDispatchToProps = () => (dispatch) => ({
  createEvent: (event, history) => dispatch(createEvent(event, history)),
  clearErrors: () => dispatch(clearEventErrors()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateEventForm)
);
