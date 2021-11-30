import React from "react";
import { Link } from "react-router-dom";

class EventShow extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.eventId);
    this.props.fetchUsers()
  }

  handleJoin() {
    this.props.updateCurrentUser({
      id: this.props.currentUser.id,
      eventsJoined: this.props.match.params.eventId,
    });
    this.props.updateEvent({
      id: this.props.match.params.eventId,
      guests: this.props.currentUser.id,
    });
  }

  handlePreJoin(e) {
    this.props.joinPreJoinedEvent(this.props.match.params.eventId);
  }

  handleClick(){
    console.log(this.props.event.guests.slice(5))

  }

  render() {
    if (!this.props.event) return null;
    const joinButton = this.props.isAuthenticated ? (
      <Link
        className="join-button"
        to="/profile"
        onClick={this.handleJoin.bind(this)}
      >
        JOIN!
      </Link>
    ) : (
      <Link
        className="join-button"
        to="/signup"
        onClick={this.handlePreJoin.bind(this)}
      >
        JOIN!
      </Link>
    );

    // const guestsId = this.props.event.guests
    // const users = this.props.users
    // const user = users.filter( user => guestsId.includes(user._id))
    const guests = this.props.event.guests


    return (
      <div className="event-show-page">
        <div className="event-show-content">
          <img
            className="show-img"
            src="https://atb-photos.s3.amazonaws.com/profile1.png"
            alt="event"
          />
          <div className="event-show-detials">
            <div className="event-details">
              <p>{this.props.event.time}</p>
              <br />
            </div>
            <div className="event-title">{this.props.event.name}</div>
            <div className="description">{this.props.event.description}</div>
            {/* <div className="guests">{guests.slice(0, 5)}</div> */}
            <div className="guests">{guests.slice(0, 5)} 
            <button className="read-more-button" onClick={this.handleClick}>Read More...</button>
            </div>
            {joinButton}
          </div>
        </div>
      </div>
    );
  }
}
export default EventShow;
//
