import React from "react";
import axios from "axios";
class UserPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      url: "",
      error: false,
      errorMessage: "",
    };
  }

  handleChange = (ev) => {
    this.setState({ success: false, url: "" });
  };
  // Perform the upload
  handleUpload = (ev) => {
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split(".");
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");
    axios
      .post("http://localhost:5000/sign_s3", {
        fileName: fileName,
        fileType: fileType,
      })
      .then((response) => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;
        this.setState({ url: url });
        console.log("Recieved a signed request " + signedRequest);

        // Put the fileType in the headers for the upload
        var options = {
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
      <>
        {/* <center> */}
          {this.state.success ? <SuccessMessage /> : null}
          {this.state.error ? <ErrorMessage /> : null}
          <label className="photo-header">Change profile</label>
          <input
            className="photo-input"
            type="file"
            value={this.state.url}
            onChange={this.handleChange}
            ref={(ref) => {
              this.uploadInput = ref;
            }}
          />
          <button className="upload-picture-button" onClick={this.handleUpload}>
            Upload Profile
          </button>
        {/* </center> */}
      </>
    );
  }
}
export default UserPhoto;
