import React from 'react';
import EventIndexItem from './event_index_item';


class EventIndex extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
      this.props.fetchEvents()  
  }; 
  
  
  render(){
    const {events} = this.props;
    const EventItems = (events || []).map((event) => (
      <EventIndexItem key={event.id} event={event}/>
    ));
    return (
      <div classsName="event-index-page">
          <div className='event-lines'>{EventItems}</div>
      </div>
    )
  }

}

export default EventIndex

// src/components/tweets/tweets.js

// import React from 'react';
// import { withRouter } from 'react-router-dom';
// import TweetBox from './tweet_box';

// class Tweet extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       tweets: []
//     }
//   }

//   componentWillMount() {
//     this.props.fetchTweets();
//   }

//   componentWillReceiveProps(newState) {
//     this.setState({ tweets: newState.tweets });
//   }

//   render() {
//     if (this.state.tweets.length === 0) {
//       return (<div>There are no Tweets</div>)
//     } else {
//       return (
//         <div>
//           <h2>All Tweets</h2>
//           {this.state.tweets.map(tweet => (
//             <TweetBox key={tweet._id} text={tweet.text} />
//           ))}
//         </div>
//       );
//     }
//   }
// }

// export default withRouter(Tweet);