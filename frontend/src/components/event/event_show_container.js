import { connect } from "react-redux";
import {fetchEvent } from "../../actions/event_actions";
import EventShow from "./event_show";

const mapStateToProps = (state, ownProps) => ({

  event: (Object.values(state.events).filter(event => event._id === ownProps.match.params.eventId)[0])

  
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvent: eventId => dispatch(fetchEvent(eventId))
}); 

export default connect(mapStateToProps, mapDispatchToProps)(EventShow);

