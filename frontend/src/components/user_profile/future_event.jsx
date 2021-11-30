import React from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import debounce from 'lodash.debounce';
>>>>>>> 63bf2ef495274ae53c377861feb29a8454df8bc8

class FutureEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: "", user: {}}
    this.timerId = 0
  }
  componentDidMount() {
    this.props.fetchEvents();
    this.props.receiveInvites();
    this.props.fetchFriendRequests();
    this.props.fetchUsers();
    if (this.props.preJoinedEvent !== "") {
      this.props.updateCurrentUser({
        id: this.props.currentUser.user.id,
        eventsJoined: this.props.preJoinedEvent,
      });
      this.props.updateEvent({
        id: this.props.preJoinedEvent,
        guests: this.props.currentUser.user.id,
      });
    }
  }

  debounce(){
    const {name} = this.state
    console.log(name)
    const {fetchFilteredUsers} = this.props
    clearTimeout(this.timerId)
   this.timerId = setTimeout(() => fetchFilteredUsers(name), 200)
    
  }


  update(field) {
    return (e) =>{
      this.setState({
        [field]: e.currentTarget.value,
      }, () => this.debounce())
    }
  }


  submitFriendRequest() {
    // return (e) => {e.preventDefault();
    
    // const user = this.props.users.filter(user => user.name === name)[0];
    // if (user) 
    // if (Object.values(this.props.filters).filter(user => user.name)
    this.props.createFriendRequest(this.state.user)
    
  }

  handleApprove(invite) {
    this.props.updateFriend({
      status: "approved",
      requester: invite.requester,
    });
  }

  handleReject(invite) {
    this.props.updateFriend({ status: "denied", requester: invite.requester });
  }

  changeSearchBar(user){
   
    if (this.state.name !== user.name) {
      console.log("changing state name")
      this.setState({name: user.name, user: user})
    }
    else {
      console.log("clearing state name")
      this.setState({name: "", user: {}})
    }
    
    
  }
  

  render() {

    const { events, currentUser, invites, users, filters } = this.props;
    const myEvents = events.filter(
      (event) => event.hostId === currentUser.user.id
    );
    const myJoinedEvents = events.filter((event) =>
      event.guests.includes(currentUser.user.id)
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
          <Link to="/">UPCOMING EVENTS</Link>
          {displayMyJoinedEvents}
        </div>

        <div className="p-event-container-title">
          <Link to="/events/create">HOST EVENTS</Link>
          {displayMyEvents}
        </div>

        <div className="profile-event-page">
          <div className="p-event-container-title">FRIENDS</div>
          <h3>Friend Requests From</h3>
                  <ul>
                    {
                    Object.values(this.props.invites).map((invite) => 
                      {if (invite.status === "pending"){
                        <li>{Object.values(users).filter(user => user._id === invite.requester)[0].name}
                        <button onClick={this.handleApprove.bind(this, invite)}>Approve</button>
                        <button onClick={this.handleReject.bind(this, invite)}>Deny</button>
                        </li>
                      }}
                     
                    )}
                  </ul>
            <h3>Send a friend request</h3>
                <form onSubmit={this.submitFriendRequest.bind(this)}>
                  <label>Name</label>
                  <div>
                  <input value={this.state.name} placeholder="Enter Name" type="text" onChange={this.update('name')}/>
                  
                  {Object.values(filters).length > 0  ? filters.map(user =>
                    <div onClick={this.changeSearchBar.bind(this, user)}>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                    </div>
                  ) : ""}

                  {/* {Object.values(users)
                  .filter((user) => {
                  if (this.state.name = ""){
                    return user 
                  }
                  else if (user.name.toLowerCase().includes(this.state.name.toLowerCase()))
                  {
                    return user; 
                  }
                  }).map((user) => {
                    <div onClick={this.populateSearchBar.bind(this, user.name)}>{user.name}</div>})} */}


                  </div>
                  <button type="submit">Submit</button>
                </form> 
                
                {/* <div>{display}</div> */}
          


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
