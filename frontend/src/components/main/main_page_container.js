import { connect } from 'react-redux';
import { fetchEvents, fetchEvent } from '../../actions/event_actions';
import MainPage from './main_page';

const mapStateToProps = (state) => ({
  
    events: Object.values(state.events),
    // event: state.entities.events[ownProps.match.params.eventId]
});

const mapDispatchToProps = dispatch => ({
  
    fetchEvents: () => dispatch(fetchEvents()),
    // fetchEvent: eventId => dispatch(fetchEvent(eventId))

});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);