import React, { useState } from "react";
import { Link } from "react-router-dom";

class EventShow extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    // this.toggleIsTruncated = this.toggleIsTruncated.bind(this)
    //  const guests = this.props.event.guests;
    //  const [isTruncated, setIsTruncated] = useState(true);
    //  const resultString = isTruncated ? guests.slice(0, 3) : guests;
  }

  componentDidMount() {
    this.props.fetchEvent(this.props.match.params.eventId);
    this.props.fetchUsers();
  }

  handleJoin() {
    this.props.updateEvent({
      id: this.props.match.params.eventId,
      guests: this.props.currentUser.id,
    });
  }

  handlePreJoin(e) {
    this.props.joinPreJoinedEvent(this.props.match.params.eventId);
  }

  handleClick() {
    this.props.event.guests();
  }

  // toggleIsTruncated() {
  //   setIsTruncated(!isTruncated);
  // }

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

    const guests = this.props.event.guests;
    const firstGuests = guests.slice(0, 3);
    // const [isTruncated, setIsTruncated] = useState(true)
    // const resultString = isTruncated ? firstGuests : guests;

    return (
      <div className="event-show-page">
        <div className="event-show-content">
          {/* <div className="img-and-button"> */}
          <img
            className="show-img"
            src="https://atb-photos.s3.amazonaws.com/profile1.png"
            alt="event"
          />
          {/* <div>{joinButton} </div>
          </div> */}

          <div className="event-show-detials">
            <div className="event-details">
              <p>{this.props.event.time}</p>
              <br />
            </div>
            <div className="event-title">{this.props.event.name}</div>
            <div className="description">{this.props.event.description}</div>
            <div className="description">
              <span className="event-guests">Guests: </span>
              {guests.map((guest) => (
                <li style={{ listStyleType: "none" }}>{guest}</li>
              ))}
            </div>

            {/* <div className="description"> <span className="event-guests">Guests: </span>{firstGuests.map(guest => ({guest} + ",  ")) }<span className="event-guests" onClick={() => this.handleClick()}>Read More...</span></div> */}

            {joinButton}
          </div>
        </div>
      </div>
    );
  }
}
export default EventShow;
//
