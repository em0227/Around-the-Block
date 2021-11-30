
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createEvent } from "../../actions/event_actions";
import CreateEventForm from "./create_event";

const mapStateToProps = (state) => ({
  errors: state.errors.events.message,
});

const mapDispatchToProps = () => (dispatch) => ({
  createEvent: (event, history) => dispatch(createEvent(event, history)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateEventForm));