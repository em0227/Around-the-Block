import React from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import { FaUserCircle } from "react-icons/fa";
import { Link as Link1 } from "react-scroll";


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", user: {}, hideFilters: true };
    this.timerId = 0;
  }
  componentDidMount() {
    this.props.fetchEvents();

    if (this.props.preJoinedEvent !== "") {
      this.props.updateEvent({
        id: this.props.preJoinedEvent,
        guests: this.props.currentUser.id,
      });
    }
  }

  debounce() {
    const { name } = this.state;
    const { fetchFilteredUsers } = this.props;
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => fetchFilteredUsers(name), 200);
  }

  update(field) {
    return (e) => {
      this.setState(
        {
          [field]: e.currentTarget.value,
        },
        () => {
          this.debounce();
        }
      );
    };
  }

  submitFriendRequest(e) {
    e.preventDefault();
    this.props
      .createFriendRequest({ recipient: this.state.user })
      .then(
        this.setState({ name: "", email: "", user: {}, hideFilters: true })
      );
  }

  // handleApprove(requestId) {
  //   this.props.updateFriend({
  //     request: requestId,
  //     status: "approved"
  //   });
  // }

  // handleReject(requestId) {
  //   this.props.updateFriend({
  //     request: requestId,
  //     status: "denied"
  //   });
  // }

  changeSearchBar(user) {
    if (this.state.email !== user.email) {
      this.setState({ name: user.name, user: user, email: user.email });
    } else {
      this.setState({ name: "", user: {}, email: "", hideFilters: false });
    }
  }

  leaveEvent(eventId) {
    this.props.leaveEvent({
      id: eventId,
      guests: this.props.currentUser.id,
    });
  }

  deleteEvent(eventId) {
    this.props.deleteEvent(eventId);
  }

  handleUnfriend(friendId){
      this.props.deleteFriend(friendId)
  }

  render() {
    console.log(this.state.hideFilters);
    const { events, errors, currentUser, invites, users, filters } = this.props;
    const myEvents = events.filter((event) => event.hostId === currentUser.id);
    const myJoinedEvents = events.filter((event) =>
      event.guests.includes(currentUser.id)
    );
    let displayMyEvents = myEvents.map((event, index) => {
      return (
        <div key={index} className="profile-event-page">
          <div className="p-event-container-title"></div>

          <div className="profile-event-container">
            <div className="profile-event-content">
              <Link  to={`/events/${event._id}`}>
                <img className="p-e-img" src={event.imageUrl} />
              </Link>

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

                <div className="p-event-buttons">
                  <Link className="p-e-l" to={`/events/update/${event._id}`}>
                    <span className="p-e-btn">Update</span>
                  </Link>
                  <button
                    className="p-e-l"
                    onClick={() => this.deleteEvent(event._id)}
                  >
                    <span className="p-e-btn">Cancel</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    let displayMyJoinedEvents = myJoinedEvents.map((event, index) => {
      return (
        <div>
          <div key={index} className="profile-event-page">
            <div className="p-event-container-title"></div>

            <div className="profile-event-container">
              <div className="profile-event-content">
                <Link to={`/events/${event._id}`}>
                  <img className="p-e-img" src={event.imageUrl} />{" "}
                </Link>
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
                  <div className="p-event-desc">
                    <button
                      className="p-e-l"
                      onClick={() => this.leaveEvent(event._id)}
                    >
                      <span className="p-e-btn">Cancel</span>
                    </button>
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
        <div className="p-event-container-title" id="upcoming-event">
          <Link className="session-titles" to="/">
            UPCOMING EVENTS
          </Link>
          {displayMyJoinedEvents}
        </div>

        <div className="profile-event-page" id="host-event">
          <div className="p-event-container-title" id="host-event">
            <Link className="session-titles" to="/events/create">
              HOST EVENTS
            </Link>
            {displayMyEvents}
          </div>

          <div className="profile-event-page" id="friends">
            <div className="p-event-container-title">
              {/* <div className="session-titles">FRIENDS</div> */}
              <Link1
                to="around-the-block"
                smooth={true}
                duration={1000}
                className="session-titles"
              >
                FRIENDS
              </Link1>

              
              <div className="friend-request-container">
                <form
                  className="friend-search-form"
                  onSubmit={this.submitFriendRequest.bind(this)}
                >
                  <div className="friend-search-bar-error">
                    {errors.recipient}
                  </div>
                  <div>
                    <input
                      value={this.state.name}
                      className="friend-search-bar"
                      placeholder="Enter Friend's Name"
                      type="text"
                      onChange={this.update("name")}
                    />

                    <div className="entire-dropdown">
                      {(this.state.name.length > 0 && filters.length > 0) ||
                      !this.state.hideFilters
                        ? filters.map((user, idx) => (
                            <div
                              tabIndex="0"
                              className="user-info-1"
                              key={idx}
                              onClick={this.changeSearchBar.bind(this, user)}
                            >
                              <div tabIndex="1" className="user-info-">
                                {user.picture === "noPicture" || !user.picture ? 
                                <FaUserCircle className="user-info-icon" /> : 
                                <img className="user-search-icon" src={user.picture}></img>
                              }
                                <div className="user-info-content">
                                  <div className="user-info-content-input">
                                    {user.name}
                                  </div>
                                  <div className="user-info-content-input">
                                    {user.email}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        : ""}
                    </div>
                  </div>
                  <button className="friend-search-button" type="submit">
                    Send
                  </button>
                </form>

                {currentUser.friends
                ? currentUser.friends.map((friend, idx) => (
                    <div key={idx}>
                      <li>{friend.friendName}</li>
                      <li>{friend.friendEmail}</li>
                      {friend.friendImage === "noPicture" || !friend.friendImage ? 
                                <FaUserCircle className="user-info-icon" /> : 
                                <img className="user-search-icon" src={friend.friendImage}></img>
                      }
                      <button onClick={this.handleUnfriend.bind(this, friend.friendId)}>Unfriend</button>
                    </div>
                  ))
                : ""}
              {/* </div> */}
              {/* friend's section end div*/}
                {/* <div className="friend-search-bar-error">
                  {errors.recipient}
                </div> */}
                {/* </div> */}

                {/* <div className="profile-friends-container"> */}
                {/* <div className="profile-page-friends">
                  <img
                    className="p-e-i"
                    src="https://atb-photos.s3.amazonaws.com/emily.png"
                  />
                  <img
                    className="p-e-i"
                    src="https://atb-photos.s3.amazonaws.com/feifei_headshot.JPG"
                  />
                  <img
                    className="p-e-i"
                    src="https://atb-photos.s3.amazonaws.com/hien.png"
                  />
                  <img
                    className="p-e-i"
                    src="https://atb-photos.s3.amazonaws.com/sigdha.png"
                  />
                </div> */}
              </div>
            </div>
            {/* friend's section end div */}
          </div>
        </div>
        {/* // </div> */}
      </div>
    );
  }
}

export default ProfilePage;
