import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineUpcoming, MdUpcoming } from "react-icons/md";
import { GiThreeFriends } from "react-icons/gi";
import {MdEventSeat} from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen} from '@fortawesome/free-solid-svg-icons';
import {Link as Link1} from "react-scroll";
import axios from "axios";


class SecondNavBar extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.currentUser);
    this.state = {
      showModal: false,
      name: this.props.currentUser.name,
      email: this.props.currentUser.email,
      success: false,
      url: "",
      error: false,
      errorMessage: "",
    };
  }

  profileModalAppears() {
    this.setState({ showModal: true });
  }

  clearModal() {
    this.setState({ showModal: false });
  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateCurrentUser({
      name: this.state.name,
      email: this.state.email,
    });
    this.setState({ showModal: false, name: "", email: "" });
  }

  handleChange = (ev) => {
    this.setState({ success: false, url: "" });
  };
  handleUpload = (ev) => {
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split(".");
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");
    axios
      .post("http://localhost:3000/sign_s3", {
        fileName: fileName,
        fileType: fileType,
      })
      .then((response) => {
        {
          console.log(
            "response.data.data.returnData",
            response.data.data.returnData
          );
        }
        const returnData = response.data.data.returnData;
        {
          console.log("returnData.signedRequest", returnData.signedRequest);
        }
        const signedRequest = returnData.signedRequest;
        const url = returnData.url;
        this.setState({ url: url });
        console.log("Recieved a signed request " + signedRequest);

        const options = {
          headers: {
            "Content-Type": fileType,
          },
        };
        axios
          .put(signedRequest, file, options)
          .then((result) => {
            console.log("Response from s3");
            this.setState({ success: true });
          })
          .catch((error) => {
            alert("ERROR " + JSON.stringify(error));
          });
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

  render() {
    const { currentUser } = this.props;
     const SuccessMessage = () => (
       <div style={{ padding: 50 }}>
         <h3 style={{ color: "green" }}>SUCCESSFUL UPLOAD</h3>
         <a href={this.state.url}>Access the file here</a>
         <br />
       </div>
     );
     const ErrorMessage = () => (
       <div style={{ padding: 50 }}>
         <h3 style={{ color: "red" }}>FAILED UPLOAD</h3>
         <span style={{ color: "red", backgroundColor: "black" }}>ERROR: </span>
         <span>{this.state.errorMessage}</span>
         <br />
       </div>
     );
    return (
      <div className="second-nav-bar">
        <div className="icons">
          <div className="text-and-icon">
            <Link1 to="upcoming-event" smooth={true} duration={1000}>
              {" "}
              <MdOutlineUpcoming className="nav-icon" />{" "}
            </Link1>
            <p className="text">Upcoming Events</p>
          </div>
          <div className="text-and-icon">
            <Link1 to="host-event" smooth={true} duration={1000}>
              <MdEventSeat className="nav-icon" />{" "}
            </Link1>
            <p className="text">Hosted Events</p>
          </div>
          <div className="text-and-icon">
            <Link1 to="friends" smooth={true} duration={1000}>
              <GiThreeFriends className="nav-icon" />{" "}
            </Link1>
            <p className="text">Friends</p>
          </div>
          <div className="text-and-icon">
            <button
              className="profile-button"
              onClick={this.profileModalAppears.bind(this)}
            >
              <FontAwesomeIcon className="pen-icon" icon={faPen} />{" "}
            </button>
            <p className="text">Update profile</p>
          </div>

          {/* <div className="modal-background" >
              <div className="modal-child">
           */}
          {this.state.showModal ? (
            <form className="modal" onSubmit={this.handleSubmit.bind(this)}>
              <div className="close-modal" onClick={this.clearModal.bind(this)}>
                X
              </div>
              <h2 className="update-profile-header">Update Your Profile</h2>
              <div className="name-and-email">
                <label className="name-header">Name</label>
                <input
                  className="name-input"
                  type="text"
                  value={this.state.name}
                  onChange={this.update("name")}
                />
                <label className="email-header">Email</label>
                <input
                  className="email-input"
                  type="text"
                  value={this.state.email}
                  onChange={this.update("email")}
                />
                {this.state.success ? <SuccessMessage /> : null}
                {this.state.error ? <ErrorMessage /> : null}
                <label className="email-header">Change profile</label>
                <input
                  className="email-input"
                  type="file"
                  value={this.state.email}
                  onChange={this.handleChange}
                  ref={(ref) => {
                    this.uploadInput = ref;
                  }}
                />
                <button className="upload-picture-button" onClick={this.handleUpload}>
                  Upload Profile
                </button>
              </div>

              <button className="submit-updated-user" type="Submit">
                Submit
              </button>
            </form>
          ) : (
            ""
          )}

          {/* </div>
              </div> */}
        </div>
      </div>
    );
  }
}

export default SecondNavBar;


