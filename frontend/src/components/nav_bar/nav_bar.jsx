import React from "react";
import { Link } from "react-router-dom";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { AiOutlineSetting } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GrNotes } from "react-icons/gr";
import { RiBluetoothConnectLine } from "react-icons/ri";
import CreateEventForm from "../user_profile/create_event";
import { ReactDOM } from "react";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdown: false,
    };

    this.logoutUser = this.logoutUser.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown(e) {
    e.stopPropagation();
    this.setState({ isDropdown: !this.state.isDropdown });
  }
  // Selectively render links dependent on whether the user is logged in

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push("/");
  }

  handleApprove(requestId) {
    this.props.updateFriend({
      request: requestId,
      status: "approved",
    });
  }

  handleReject(requestId) {
    this.props.updateFriend({
      request: requestId,
      status: "denied",
    });
  }

  render() {
    const { events, currentUser } = this.props;
    const { isDropdown } = this.state;

    let dropdownMenu;
    if (isDropdown && this.props.loggedIn) {
      dropdownMenu = (
        <div className="loggedin-drop-down">
          <div className="drop-down-profile">
            <h3>Notification</h3>
            {currentUser.user.requestsReceived.map((request) => (
              <div className="drop-down-list">
                <p>
                  <span className="requester-text">
                    {request.requesterName}
                  </span>
                  send you a friend request
                </p>
                <div className="button-container">
                  {/* <li>{request.requesterEmail}</li> */}
                  <button
                    className="button approve"
                    onClick={this.handleApprove.bind(this, request._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="button deny"
                    onClick={this.handleReject.bind(this, request._id)}
                  >
                    Deny
                  </button>
                </div>
              </div>
            ))}
            {/* <div className="drop-down-list">
              <CgProfile
                className="svg drop"
                style={{ width: 45, height: 55 }}
              />
              <div className="drop-down-item">
                <p> Friend Request!</p>
                <Link
                  style={{ textDecoration: "none", backgroundColor: "white" }}
                  to="/profile"
                >
                  View Your Profile
                </Link>
              </div>
            </div>
            <div className="drop-down-list">
              <AiOutlineSetting
                className="svg drop"
                style={{ width: 50, height: 50 }}
              />
              <div className="link"> Settings </div>
            </div>
            <div className="drop-down-list">
              <GrNotes className="svg drop" style={{ width: 45, height: 45 }} />
              <div className="link"> Feedback </div>
            </div>
            <div className="drop-down-list">
              <CgLogOut
                className="svg drop"
                style={{ width: 45, height: 45 }}
              />
              <p onClick={this.logoutUser}>Logout</p>
            </div> */}
          </div>
        </div>
      );
    }

    const getLinks = this.props.loggedIn ? (
      <div className="logged-in">
        <div className="logged-in-profile-icon">
          <button className="btn logout-button" onClick={this.logoutUser}>
            Logout
          </button>
          <Link className="btn nav-button" to="/events/create">
            Create Event
          </Link>
          <Link className="link" to="/profile">
            <CgProfile className="nav-icon" />
          </Link>
          <div>
            <IoMdNotificationsOutline
              className="nav-icon bell"
              style={{ width: 60, height: 60, marginRight: 0, color: "" }}
              onClick={this.toggleDropdown}
            />
            <div className="counter">{currentUser.user.requestsReceived.length}</div>
          </div>
          <div>{dropdownMenu}</div>
        </div>
      </div>
    ) : (
      // </div>
      <div className="nav-bar-btn">
        <Link className="btn" to="/signup">
          Signup
        </Link>
        <Link className="btn" to="/login">
          Login
        </Link>
      </div>
    );
    return (
      <div>
        <div className="nav-bar">
          <Link to="/" className="app-name">
            Around the <span className="app-span">Block</span>
          </Link>
          {getLinks}
        </div>
      </div>
    );
  }
}

export default NavBar;
