import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineUpcoming, MdUpcoming } from "react-icons/md";
import { GiThreeFriends } from "react-icons/gi";
import {MdEventSeat} from "react-icons/md";
// import {Link as Link1} from "react-scroll";

class SecondNavBar extends React.Component {
    render() {
        return (
          <div className="second-nav-bar">
              <div className="icons">
               {/* <Link1 to="upcoming-event" smooth={true} duration={1000}> <MdOutlineUpcoming className="nav-icon" /> </Link1>
                <Link1 to="host-event" smooth={true} duration={1000}><MdEventSeat className="nav-icon" /> </Link1>
                <Link1 to="friends" smooth={true} duration={1000}><GiThreeFriends className="nav-icon" /> </Link1> */}
            </div>
          </div>
        );

    }

}

export default SecondNavBar;


