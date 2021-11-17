import React from "react";
import { withRouter } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrFormNextLink } from "react-icons/gr";
import { HiOutlineClipboardList } from "react-icons/hi";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-us";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      // confirmPassword: "",
      errors: {},
      isListening: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setIsListening = this.setIsListening.bind(this);
    this.handleListen = this.handleListen.bind(this);
    // this.clearedErrors = false;
  }

  componentDidMount() {
    this.handleListen();
  }

  // componentDidUpdate() {
  //   this.handleListen();
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push("/login");
    }

    this.setState({ errors: nextProps.errors });
  }

  handleListen() {
    if (this.state.isListening) {
      // mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      // mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      let transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);

      if (transcript.includes("email")) {
        const last = transcript.indexOf("email");
        let realTranscript = transcript.slice(last + 5);
        // realTranscript = realTranscript.replace("email", "");

        if (realTranscript.includes("at")) {
          let newTranscript = realTranscript.replace("at", "@");
          this.setState({ email: newTranscript });
        } else {
          this.setState({ email: realTranscript });
        }

        // if (transcript.includes("next")) {
        //   realTranscript = realTranscript.replace("next", "");
        //   //not sure if above can work
        //   this.setState({ email: realTranscript });
        //   transcript = "";
        // }
      } else if (transcript.includes("name")) {
        let realTranscript = transcript;
        console.log("real transcript");
        console.log(realTranscript);
        realTranscript = realTranscript.replace("my name is ", "");
        console.log("transcript");
        console.log(transcript);
        console.log("real transcript");
        console.log(realTranscript);
        this.setState({ name: realTranscript });

        // if (transcript.includes("next")) {
        //   // debugger;
        //   realTranscript = realTranscript.replace("next", "");
        //   //not sure if above can work
        //   transcript = "";
        //   debugger;
        //   this.setState({ name: realTranscript });
        // }
      }

      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  }

  voiceEmail(transcript) {
    this.setState({ email: transcript });
    if (transcript.includes("at")) {
      let newTranscript = transcript.replace("at", "@");
      this.setState({ email: newTranscript });
    }
  }

  setIsListening(e) {
    // e.preventDefault();
    this.setState({ isListening: !this.state.isListening }, () => {
      if (this.state.isListening) {
        console.log("in new start");
        mic.start();
      } else {
        console.log("in new stop");
        mic.stop();
      }
    });
  }

  update(field) {
    return (e) => {
      console.log(this.state);
      this.setState({
        [field]: e.currentTarget.value,
      });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      // confirmPassword: this.state.confirmPassword,
    };

    this.props.signup(user, this.props.history);
  }

  renderErrors() {
    return (
      <ul className="render-errors">
        {Object.keys(this.state.errors).map((error, i) => (
          <li style={{ marginBottom: 5, fontSize: "20px" }} key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="form-container">
        <div className="form">
          <div className="form-content">
            <form className="form-inner" onSubmit={this.handleSubmit}>
              <div className="form__field new">
                <br />
                <i>
                  <HiOutlineClipboardList style={{ marginRight: 10 }} />
                </i>
                <input
                  className="input-holder"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.update("name")}
                  placeholder="Name"
                />
              </div>
              <br />
              <div className="form__field new">
                <i>
                  <FaUser style={{ marginRight: 10 }} />
                </i>
                <input
                  className="input-holder"
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.update("email")}
                  placeholder="Email"
                />
              </div>

              <br />
              <div className="form__field new">
                <i>
                  <RiLockPasswordFill style={{ marginRight: 10 }} />
                </i>
                <input
                  className="input-holder"
                  type="password"
                  value={this.state.password}
                  onChange={this.update("password")}
                  placeholder="Password"
                />
              </div>
              <br />
              <div>
                <button className="button form__submit" type="submit">
                  <span className="button__text">SIGN UP NOW</span>
                  <i>
                    <GrFormNextLink />
                  </i>
                </button>
                <br />
                {this.renderErrors()}
              </div>
              <div className="form__background">
                <span className="form__background__shape form__background__shape2"></span>
              </div>
            </form>
          </div>
        </div>
        {this.state.isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
        <button onClick={this.setIsListening}>Start/Stop</button>
      </div>
    );
  }
}

export default withRouter(SignupForm);
