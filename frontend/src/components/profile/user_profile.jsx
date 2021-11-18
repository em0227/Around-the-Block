import React from "react";
import { Link } from "react-router-dom";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.handleRequest = this.handleRequest.bind(this)
    this.submitFriendRequest = this.submitFriendRequest.bind(this)
    this.state = {creatingFriendRequest: false,
    name: "" }
  }
  componentDidMount() {
    this.props.fetchEvents()
    this.props.receiveInvites(); 
    this.props.fetchFriendRequests();
    this.props.fetchUsers()
  }

  handleRequest(){
    this.setState({creatingFriendRequest: true})
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  submitFriendRequest(name){
    const user = this.props.users.filter(userName => userName === name)
    if (user) this.props.createFriendRequest(user._id)
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
        <Link className="btn">Friend Request</Link>
        <Link className="btn" to="/events/create">
          Create Event
        </Link>
        <button onClick={this.handleRequest()}>New Friend Request</button>
        {this.state.creatingFriendRequest ?
        <form onSubmit={this.submitFriendRequest(this.state.name)}>
          <label>Name</label>
          <input type="text" onChange={this.update('name')}/>
        </form> 
        
        : ""}
        {this.state.creatingFriendRequest = false}
        <div>{display}</div>
      </div>
    );
  }
}

export default UserProfile;
