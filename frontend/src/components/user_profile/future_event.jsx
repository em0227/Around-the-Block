import React from "react";
import { Link } from "react-router-dom";
import debounce from 'lodash.debounce';
// import { AiOutlineSearch} from "react-icons/ai";

class FutureEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", user: {} };
    this.timerId = 0;
    this.handleOpenForm = this.handleOpenForm.bind(this);
  }
  componentDidMount() {
    this.props.fetchEvents();
    // this.props.receiveInvites();
    // this.props.fetchFriendRequests();
    // this.props.fetchUsers();
    if (this.props.preJoinedEvent !== "") {
      this.props.updateEvent({
        id: this.props.preJoinedEvent,
        guests: this.props.currentUser.id,
      });
    }
  }

  debounce(){
    const {name} = this.state
    const {fetchFilteredUsers} = this.props
    clearTimeout(this.timerId)
   this.timerId = setTimeout(() => fetchFilteredUsers(name), 200)
    
  }

  update(field) {
    return (e) =>{
      this.setState({
        [field]: e.currentTarget.value,
      }, () => {this.debounce()})
    }
  }

  submitFriendRequest() {
    // return (e) => {e.preventDefault();

    // const user = this.props.users.filter(user => user.name === name)[0];
    // if (user)
    // if (Object.values(this.props.filters).filter(user => user.name)
    this.props.createFriendRequest({recipient: this.state.user})
    
  }

  handleApprove(requestId) {
    this.props.updateFriend({
      request: requestId,
      status: "approved"
    });
  }
  handleOpenForm(event) {
    // this.props.updateEvent(event);
  }

  handleReject(requestId) {
    this.props.updateFriend({ 
      request: requestId,
      status: "denied"
    });
  }

  changeSearchBar(user) {
    if (this.state.name !== user.name) {
      console.log("changing state name");
      this.setState({ name: user.name, user: user });
    } else {
      console.log("clearing state name");
      this.setState({ name: "", user: {} });
    }
  }

  leaveEvent(eventId) {
    this.props.leaveEvent({
      id: eventId,
      guests: this.props.currentUser.id,
    });
    // this.props.fetchEvents();
  }

  deleteEvent(eventId) {
    this.props.deleteEvent(eventId);
    // this.props.fetchEvents();
  }

  render() {
    
    const { events, errors, currentUser, invites, users, filters } = this.props;
    const myEvents = events.filter(
      (event) => event.hostId === currentUser.user.id
    );
    const myJoinedEvents = events.filter((event) =>
      event.guests.includes(currentUser.id)
    );
    let displayMyEvents = myEvents.map((event, index) => {
      return (
        <div key={index} className="profile-event-page">
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
                <div className="p-event-desc">
                  <Link className="p-e-d" to={`/events/update/${event._id}`}>
                    Update
                  </Link>
                </div>
                <div className="p-event-desc">
                  <button
                    className="p-e-d"
                    onClick={() => this.deleteEvent(event._id)}
                  >
                    Cancel Event
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
                  <div className="p-event-desc">
                    <button
                      className="p-e-d"
                      onClick={() => this.leaveEvent(event._id)}
                    >
                      Can't Make It
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

        <div className="p-event-container-title" id="host-event">
          <Link className="session-titles" to="/events/create">
            HOST EVENTS
          </Link>
          {displayMyEvents}
        </div>

        <div className="profile-event-page" id="friends">
          <div className="p-event-container-title">FRIENDS</div>
          <h3>Friends</h3>
          {currentUser.user.friends.length > 0
            ? currentUser.user.friends.map((friend) => (
                <div>
                  <li>{friend.friendName}</li>
                  <li>{friend.friendEmail}</li>
                </div>
              ))
            : ""}
          <h3>Friend Requests From</h3>
          {currentUser.user.requestsReceived.map((request) => (
            <div>
              <li>{request.requesterName}</li>
              <li>{request.requesterEmail}</li>
              <button onClick={this.handleApprove.bind(this, request._id)}>
                Approve
              </button>
              <button onClick={this.handleReject.bind(this, request._id)}>
                Deny
              </button>
            </div>
          ))}

          {/* <h3>Send a friend request</h3> */}
          <div className="friend-request-container">
          <form className="friend-search-form"
          onSubmit={this.submitFriendRequest.bind(this)}>
            {/* <label>Name</label> */}
            <div>
              <input
                value={this.state.name}
                className="friend-search-bar"
                placeholder="Enter Friend's Name"
                type="text"
                onChange={this.update("name")}
              />

              {this.state.name.length > 0 && filters.length > 0
                ? filters.map((user) => (
                    <div onClick={this.changeSearchBar.bind(this, user)}>
                      <p className="user-info">{user.name}</p>
                      <p className="user-info">{user.email}</p>
                    </div>
                  ))
                : ""}
            </div>
            <button className="friend-search-button" type="submit">Submit</button>
          </form>
          <div>{errors.recipient}</div>
          </div>

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
