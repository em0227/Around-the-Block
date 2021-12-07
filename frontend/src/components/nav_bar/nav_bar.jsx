import React from "react";
import { Link } from "react-router-dom";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { AiOutlineSetting } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GrNotes } from "react-icons/gr";
import { RiBluetoothConnectLine } from "react-icons/ri";
import CreateEventForm from "../user_profile/create_event";
import { ReactDOM } from "react";
import { FaUserCircle } from "react-icons/fa";

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
    this.props.history.push("/profile")
  }

  handleReject(requestId) {
    this.props.updateFriend({
      request: requestId,
      status: "denied",
    });
    this.props.history.push("/profile")
  }

  render() {
    const { events, currentUser } = this.props;
    const { isDropdown } = this.state;

    let dropdownMenu;
    if (isDropdown && this.props.loggedIn) {
      dropdownMenu = (
        <div className="loggedin-drop-down">
          <div className="drop-down-profile">
            <h3>Notifications</h3>
            {currentUser.requestsReceived.map((request) => (
              <div className="drop-down-list">
                {request.requesterImage === "noPicture" || !request.requesterImage ? 
                    <FaUserCircle className="user-info-icon notifs" /> : 
                     <img className="user-search-icon-notifs" src={request.requesterImage} ></img>
                }
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
          </div>
        </div>
      );
    }

    const getLinks = this.props.loggedIn ? (
      <div className="logged-in">
        <div className="logged-in-profile-icon">
          <button className="btn logout-button" onClick={this.logoutUser}>
            <span className="btn-titles">Logout</span>
          </button>
          <Link className="btn create-button" to="/events/create">
            <span className="btn-titles create"> Create Event</span>
          </Link>
          <Link className="link" to="/profile">
          {/* <CgProfile className="nav-icon" /> */}
            {currentUser.picture === "noPicture" ? 
            <CgProfile className="nav-icon" /> : 
            <img className="user-icon" src={currentUser.picture} width="65px" ></img>
          }
          </Link>
          <div>
            <IoMdNotificationsOutline
              className="nav-icon-bell"
              // style={{ width: 60, height: 60, marginRight: 0, color: "" }}
              onClick={this.toggleDropdown}
            />
            <div className="counter">
              {currentUser.requestsReceived
                ? currentUser.requestsReceived.length
                : ""}
            </div>
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
        <div className="nav-bar" id="around-the-block">
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
