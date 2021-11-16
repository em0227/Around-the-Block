import React from "react";
import { Link } from "react-router-dom";


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <Link to={"/events"}>All Events</Link>
          <Link to={"/profile"}>Profile</Link>
          <Link to={"/new_event"}>Write a Event</Link>
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="nav-bar-btn">
          <Link className="btn" to={"/signup"}>Signup</Link>
          <Link className="btn" to={"/login"}>Login</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="nav-bar">
          <Link to="/" className="app-name">Around the <span className="app-span">Block</span></Link>
          {this.getLinks()}
        </div>
      </div>
    );
  }
}

export default NavBar;
