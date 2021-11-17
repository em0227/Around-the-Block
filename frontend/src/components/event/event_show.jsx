import React from 'react';

class EventShow extends React.Component {
    constructor(props){
        super(props);
        // console.log(props)
    }
    componentDidMount(){
        
        this.props.fetchEvent(this.props.match.params.eventId);
        // console.log(this.props)
       
    }
    render() {
        const {event} = this.props.event
        return (
            <div>
                <h1>Event Show Page</h1>
                <div>{event.name}</div>
            </div>
        )
    }
}
export default EventShow

// src/components/tweets/tweet_box.js

// import React from 'react';

// class TweetBox extends React.Component {
//   render() {
//     return (
//         <div>
//             <h3>{this.props.text}</h3>
//         </div>
//     );
//   }
// }

// export default TweetBox;