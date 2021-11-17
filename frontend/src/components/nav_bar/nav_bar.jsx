import React from "react";
import { Link } from "react-router-dom";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { AiOutlineSetting } from "react-icons/ai";
import { BiDownArrow } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsShop } from "react-icons/bs";
import { GrNotes } from "react-icons/gr";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdown: false,
    };

    this.logoutUser = this.logoutUser.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  toggleDropdown(e) {
    e.stopPropagation();
    this.setState({ isDropdown: !this.state.isDropdown });
  }
  // Selectively render links dependent on whether the user is logged in

  render() {
    const { isDropdown } = this.state;
    let dropdownMenu;
    if (isDropdown && this.props.loggedIn) {
      dropdownMenu = (
        <div className="loggedin-drop-down">
          <div className="drop-down-profile">
            <div className="drop-down-list">
              <CgProfile
                className="svg drop"
                style={{ width: 45, height: 55 }}
              />
              <div className="drop-down-item">
                <p> Hi there!</p>
                <Link className="link" to={"/profile"}>
                  View Your Profile
                </Link>
              </div>
            </div>
            <div className="drop-down-list">
              <AiOutlineSetting
                className="svg drop"
                style={{ width: 50, height: 50 }}
              />
              <Link className="link"> Settings </Link>
            </div>
            <div className="drop-down-list">
              <GrNotes className="svg drop" style={{ width: 45, height: 45 }} />
              <Link className="link"> Feedback </Link>
            </div>
            <div className="drop-down-list">
              <CgLogOut
                className="svg drop"
                style={{ width: 45, height: 45 }}
              />
              <p onClick={this.logoutUser}>Logout</p>
            </div>
          </div>
        </div>
      );
    }
    const getLinks = this.props.loggedIn ? (
      <div className="logged-in">
        <div className="logged-in-profile-icon">
          <MdFavoriteBorder className="svg" />
          <IoMdNotificationsOutline className="svg" />
          <div>
            <CgProfile className="svg" />
            <BiDownArrow
              onClick={this.toggleDropdown}
              style={{
                position: "relative",
                marginLeft: 0,
                width: 20,
                height: 20,
                color: "#F0E9D2"
              }}
            />
            <div>{dropdownMenu}</div>
          </div>
        </div>
      </div>
    ) : (
      <div className="nav-bar-btn">
        <Link className="btn" to={"/signup"}>
          Signup
        </Link>
        <Link className="btn" to={"/login"}>
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
