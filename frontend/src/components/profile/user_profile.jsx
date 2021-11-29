import React from "react";
import { Link } from "react-router-dom";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: "" }
  }
  componentDidMount() {
    this.props.fetchEvents()
    this.props.receiveInvites(); 
    this.props.fetchFriendRequests();
    this.props.fetchUsers()
  }


  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  

  submitFriendRequest(name){
    // console.log(this.props.users)
    return (e) => {e.preventDefault();
    const user = this.props.users.filter(user => user.name === name)[0];
    if (user) this.props.createFriendRequest({recipient: user._id})
    }
  }

  handleApprove(invite){
    this.props.updateFriend({status: "approved", requester: invite.requester})
  }

  handleReject(invite){
    this.props.updateFriend({status: "denied", requester: invite.requester})
  }

  render() {
    console.log(this.props.invites)
    const { events, currentUser, invites, users } = this.props;
    if (!invites) {return null} 
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
        <Link className="btn">Friend Request</Link>
        <Link className="btn" to="/events/create">
          Create Event
        </Link>
        
        <h3>Friend Requests From</h3>
        <ul>
          {
          Object.values(this.props.invites).map((invite) => 
            <li>{Object.values(users).filter(user => user._id === invite.requester)[0].name}
            <button onClick={this.handleApprove.bind(this, invite)}>Approve</button>
            <button onClick={this.handleReject.bind(this, invite)}>Deny</button>
            </li>
          )}
        </ul>


        <h3>Send a friend request</h3>
        <form onSubmit={this.submitFriendRequest.bind(this, this.state.name)}>
          <label>Name</label>
          <input type="text" onChange={this.update('name')}/>
          <button type="submit">Submit</button>
        </form> 
        
        {this.state.creatingFriendRequest = false}
        <div>{display}</div>
      </div>
    );
  }
}

export default UserProfile;
