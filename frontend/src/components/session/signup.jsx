import React from "react";
import { withRouter } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsInfoCircle } from "react-icons/bs";
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
      errors: {},
      isListening: false,
      isPlayingAudio: false,
      timerId: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setIsListening = this.setIsListening.bind(this);
    this.handleListen = this.handleListen.bind(this);
    this.debounce = this.debounce.bind(this);
    // this.clearedErrors = false;
  }

  componentDidMount() {
    this.handleListen();
    this.props.clearSessionErrors();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.signedIn === true) {
  //     this.props.history.push("/login");
  //   }

  //   this.setState({ errors: nextProps.errors });
  // }

  debounce(user) {
    clearTimeout(this.state.timerId);

    const timerId = setTimeout(() => {
      this.props.signup(user, this.props.history);
      mic.stop();
    }, 100);

    this.setState({ timerId });
  }

  handleListen() {
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);

      if (transcript.includes("submit")) {
        const email = this.state.email.replaceAll(" ", "").toLowerCase();
        let password = this.state.password.replace("submit", "");
        password = password.replace(" something", "");
        const user = {
          email,
          name: this.state.name,
          password,
        };

        this.debounce(user);
        //for now will submit signup twice, could use debounce to solve this
      } else if (transcript.includes("password")) {
        const last = transcript.indexOf("word is");
        let realTranscript = transcript.slice(last + 8);
        realTranscript = realTranscript.replace(" something", "");
        this.setState({ password: realTranscript });
      } else if (transcript.includes("email")) {
        const last = transcript.indexOf("email is");
        let realTranscript = transcript.slice(last + 8);
        realTranscript = realTranscript.replace("my pas", "");

        if (realTranscript.includes("at")) {
          realTranscript = realTranscript.replace("at", "@");
          this.setState({
            email: realTranscript.replaceAll(" ", "").toLowerCase(),
          });
        } else if (realTranscript.includes("dot")) {
          realTranscript = realTranscript.replace("dot", ".");
          this.setState({
            email: realTranscript.replaceAll(" ", "").toLowerCase(),
          });
        } else {
          this.setState({
            email: realTranscript.replaceAll(" ", "").toLowerCase(),
          });
        }
      } else if (transcript.includes("name")) {
        let realTranscript = transcript;
        const last = transcript.indexOf("name is");
        realTranscript = transcript.slice(last + 7);
        realTranscript = realTranscript.replace("my name is ", "");
        realTranscript = realTranscript.replace("my email", "");
        realTranscript = realTranscript.replace("Mayim", "");
        this.setState({ name: realTranscript });
      }

      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  }

  playAudio(e) {
    this.setState({ isPlayingAudio: !this.state.isPlayingAudio }, () => {
      const audio = document.getElementById("myAudio");
      if (this.state.isPlayingAudio) {
        audio.play();
      } else {
        audio.pause();
      }
    });
  }

  setIsListening(e) {
    this.setState({ isListening: !this.state.isListening }, () => {
      if (this.state.isListening) {
        this.setState({ isPlayingAudio: !this.state.isPlayingAudio });
        mic.start();
      } else {
        mic.stop();
      }
    });
  }

  update(field) {
    return (e) => {
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
    };

    this.props.signup(user, this.props.history);
  }

  render() {
    const { errors, clearSessionErrors } = this.props;
    return (
      <div className="form-container">
        <div className="form">
          <div className="form__content">
            <form className="form-inner" onSubmit={this.handleSubmit}>
              <div className="form__field new">
                <br />
                <i>
                  <HiOutlineClipboardList style={{ marginRight: 10 }} />
                </i>
                <div className="input-container">
                  <input
                    // onClick={errors.name ? () => clearSessionErrors() : ""}
                    className="input-holder"
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.update("name")}
                    placeholder="Name"
                  />
                  {errors.name ? (
                    <p className="error-text">{errors.name}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <br />
              <div className="form__field new">
                <i>
                  <FaUser style={{ marginRight: 10 }} />
                </i>
                <div className="input-container">
                  <input
                    // onClick={errors.name ? () => clearSessionErrors() : ""}
                    className="input-holder"
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.update("email")}
                    placeholder="Email"
                  />
                  {errors.email ? (
                    <p className="error-text">{errors.email}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <br />
              <div className="form__field new">
                <i>
                  <RiLockPasswordFill style={{ marginRight: 10 }} />
                </i>
                <div className="input-container">
                  <input
                    className="input-holder"
                    type="text"
                    value={this.state.password}
                    onChange={this.update("password")}
                    placeholder="Password"
                  />
                  {errors.password ? (
                    <p className="error-text">{errors.password}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <br />
              <div className="button-container">
                <button className="form_submit" type="submit">
                  <span className="button__text">SIGN UP NOW</span>
                </button>
                <div className="mic">
                  {this.state.isListening ? (
                    <div className="mic-on">
                      <span
                        className="form_submit micro"
                        onClick={this.setIsListening.bind(this)}
                      >
                        Stop Voice Input
                      </span>
                      <div className="loader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <span id="mic">🎙️</span>
                    </div>
                  ) : (
                    <div
                      className="mic"
                      style={{ width: "100%" }}
                      onEnded={this.setIsListening.bind(this)}
                    >
                      <audio id="myAudio">
                        <source
                          src="https://atb-photos.s3.amazonaws.com/session_form_intro.mp3"
                          type="audio/mp3"
                        />
                      </audio>
                      <div className="micro-container">
                        <span
                          className="form_submit micro"
                          onClick={this.setIsListening.bind(this)}
                          style={{ marginLeft: 0 }}
                        >
                          Sign Up With Voice
                        </span>
                        <span
                          style={{
                            color: "orange",
                            marginTop: 15,
                            marginLeft: 10,
                          }}
                        >
                          {" "}
                          <BsInfoCircle />
                        </span>
                      </div>
                      {this.state.isPlayingAudio ? (
                        <div className="mic-on">
                          <div className="loader">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                          <span id="mic">👂</span>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  )}
                </div>
                <br />
                {/* {this.renderErrors()} */}
              </div>

              {/* <div className="form__background">
                <span className="form__background__shape form__background__shape2"></span>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);
