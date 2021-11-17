import React from "react";
import { Link } from "react-router-dom";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchEvents();
  }
  render() {
    const { events, currentUser } = this.props;
    const myEvents = events.filter(
      (event) => event.hostId === currentUser.user.id
    );
    // console.log("myevents", myEvents);
    let display = myEvents.map((event, eventId) => (
      <div key={eventId}>
        <div>
          <div>
            <div>{event.title}</div>
            <div>{event.time}</div>
            <div>{event.description}</div>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <Link>Friend Request</Link>
        <Link to="/events/create">Create Event</Link>
        <div>{display}</div>
      </div>
    );
  }
}

export default UserProfile;
