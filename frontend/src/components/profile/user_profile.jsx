import React from "react";
import { Link } from "react-router-dom";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdown: false,
    };

   
  render() {
    
    return (
     
        <div className="nav-bar">
         <div>This is user profile</div>
        </div>
    );
  }
}

export default UserProfile;
