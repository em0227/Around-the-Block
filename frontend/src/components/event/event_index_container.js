import {connect} from 'react-redux';
import EventIndex from './event_index';
import { fetchEvents} from '../../actions/events_action';


const mSTP = (state) => {
  return {
  events: Object.values(state.entities.events)}
  
};

const mDTP = (dispatch) => ({
  fetchEvents: () => dispatch(fetchEvents()),
  
})

export default connect(mSTP, mDTP)(EventIndex);