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

// src/components/tweets/tweets_container.js

// import { connect } from 'react-redux';
// import { fetchTweets } from '../../actions/tweet_actions';
// import Tweets from './tweets';

// const mapStateToProps = (state) => {
//   return {
//     tweets: Object.values(state.tweets.all)
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchTweets: () => dispatch(fetchTweets())
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Tweets);