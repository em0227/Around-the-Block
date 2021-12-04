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
      image: null
    };
  }

  handleChange = (ev) => {
    this.setState({ success: false, url: "", image: ev.currentTarget.files[0]});
  };
  // Perform the upload
  handleUpload = (ev) => {
    console.log("this.uploadInput neeeee", this.state.image);
    console.log("ev", ev);

    let file = this.state.image;

    // Split the filename to get the name and type
    let fileParts = file.name.split(".");
    let fileName = fileParts.slice(0, fileParts.length).join(".");
    let fileType = fileParts[fileParts.length - 1];
    console.log("Preparing the upload");
    //"http://localhost:5000/sign_s3" backend url (file app.js line 30)
    // const sign_s3 = require("./controllers/sign_s3");
    // app.use("/sign_s3", sign_s3.sign_s3);
    axios
      .post("http://localhost:5000/sign_s3", {
        fileName: fileName,
        fileType: fileType,
      })
      .then((response) => {
        const returnData = response.data.data.returnData;
        //returnData from sign_s3.js line 31
        const signedRequest = returnData.signedRequest;
        const url = returnData.url;
        this.setState({ url: url });
        console.log("Recieved a signed request " + signedRequest);

        // Put the fileType in the headers for the upload
        const options = {
          headers: {
            "Content-Type": fileType,
          },
        };
        axios
          .put(signedRequest, file, options) //put: replace/insert
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
            onChange={this.handleChange}
            ref={(ref) => {
              this.uploadInput = ref;
            }}
          />
          <button type="button" className="upload-picture-button" onClick={this.handleUpload}>
            Upload Profile
          </button>
        {/* </center> */}
      </>
    );
  }
}
export default UserPhoto;
