import React from "react";

class FutureEvent extends React.Component {
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
    const myJoinedEvents = events.filter(
        (event) => event.guests.includes(currentUser.user.id)
    );
    let displayMyEvents = myEvents.map((event, eventId) => {
      return (
        <div key={eventId} className="profile-event-page">
          <div className="p-event-container-title"></div>

          <div className="profile-event-container">
            <div className="profile-event-content">
              <img className="p-e-img" src={event.imageUrl} />

              <div className="profile-event-detials">
                <div className="p-event-time">
                  <div className="p-e-t">{event.time}</div>
                </div>
                <div className="p-event-name">
                  <div className="p-e-n">{event.name}</div>
                </div>
                <div className="p-event-desc">
                    <div className="p-e-d">{event.description}</div>
              </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    let displayMyJoinedEvents = myJoinedEvents.map((event, joinedId) => {
      return (
        <div>
          <div key={joinedId} className="profile-event-page">
            <div className="p-event-container-title"></div>

            <div className="profile-event-container">
              <div className="profile-event-content">
                <img className="p-e-img" src={event.imageUrl} />
                <div className="profile-event-detials">
                  <div className="p-event-time">
                    <div className="p-e-t">{event.time}</div>
                  </div>

                  <div className="p-event-name">
                    <div className="p-e-n">{event.name}</div>
                  </div>
                  <div className="p-event-desc">
                    <div className="p-e-d">{event.description}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <div className="p-event-container-title">
          UPCOMING EVENTS
          {displayMyJoinedEvents}
        </div>

        <div className="p-event-container-title">
          HOST EVENTS
          {displayMyEvents}
        </div>

        <div className="profile-event-page">
          <div className="p-event-container-title">FRIENDS</div>

          <div className="profile-friends-container">
            <div className="profile-event-content">
              <img
                className="p-e-i"
                src="https://atb-photos.s3.amazonaws.com/emily.png"
              />
              <img
                className="p-e-i"
                src="https://atb-photos.s3.amazonaws.com/feifei2.JPG"
              />
              <img
                className="p-e-i"
                src="https://atb-photos.s3.amazonaws.com/hien.png"
              />
              <img
                className="p-e-i"
                src="https://atb-photos.s3.amazonaws.com/sigdha.png"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FutureEvent;

