import React from "react";
import { Link } from "react-router-dom";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { AiOutlineSetting } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GrNotes } from "react-icons/gr";
import { RiBluetoothConnectLine } from "react-icons/ri";
import CreateEventForm from "../user_profile/create_event"

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdown: false,
    };

    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push("/");
  }

  // toggleDropdown(e) {
  //   e.stopPropagation();
  //   this.setState({ isDropdown: !this.state.isDropdown });
  // }
  // Selectively render links dependent on whether the user is logged in
 
  render() {
    const { events, currentUser } = this.props;
    // const myrequests = requests.filter(
    //   (request) => request.recepientId === currentUser.user.id
    // );
    // let display = myrequests.map((request, requestId) => (
    //   <div key={requestId}>
    //     <div>
    //       <div>
    //         <div>{request.requester}</div>
    //         <div>
    // <button>Accept</button>
    // <button>Cancel</button>
    //          </div>
    //       </div>
    //     </div>
    //   </div>
    // )
    // const { isDropdown } = this.state;
    // let dropdownMenu;
    // if (isDropdown && this.props.loggedIn) {
    //   dropdownMenu = (
    //     <div className="loggedin-drop-down">
    //       <div className="drop-down-profile">
    //         <div className="drop-down-list">
    //           <CgProfile
    //             className="svg drop"
    //             style={{ width: 45, height: 55 }}
    //           />
    //           <div className="drop-down-item">
    //             <p> Friend Request!</p>
    //             <Link
    //               style={{ textDecoration: "none", backgroundColor: "white" }}
    //               to="/profile"
    //             >
    //               View Your Profile
    //             </Link>
    //           </div>
    //         </div>
    //         <div className="drop-down-list">
    //           <AiOutlineSetting
    //             className="svg drop"
    //             style={{ width: 50, height: 50 }}
    //           />
    //           <div className="link"> Settings </div>
    //         </div>
    //         <div className="drop-down-list">
    //           <GrNotes className="svg drop" style={{ width: 45, height: 45 }} />
    //           <div className="link"> Feedback </div>
    //         </div>
    //         <div className="drop-down-list">
    //           <CgLogOut
    //             className="svg drop"
    //             style={{ width: 45, height: 45 }}
    //           />
    //           <p onClick={this.logoutUser}>Logout</p>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
    const getLinks = this.props.loggedIn ? (
      <div className="logged-in">
        <div className="logged-in-profile-icon">
          <Link
            className="btn"
            style={{ width: 230, height: 40 }}
            to="/events/create"
          >
            Create Event
          </Link>
          <button
            className="btn"
            style={{ width: 200, height: 40 }}
            onClick={this.logoutUser}
          >
            Log out
          </button>
          <div style={{ width: 80, height: 40 }}>
            <IoMdNotificationsOutline
              style={{ width: 40, height: 40, paddingLeft: "40px" }}
            />
          </div>

          <Link className="link svg" to="/profile">
            <CgProfile />
          </Link>

          {/* <div>{dropdownMenu}</div> */}
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
