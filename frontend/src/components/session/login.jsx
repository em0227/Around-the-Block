import React from "react";
import { withRouter } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrFormNextLink } from "react-icons/gr";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-us";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
      isListening: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.handleListen = this.handleListen.bind(this);
    this.loginDemo = this.loginDemo.bind(this);
  }

  componentDidMount() {
    this.handleListen();
  }
  // Once the user has been authenticated, redirect to the Tweets page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      // this.props.history.push("/events");
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors });
  }

  handleListen() {
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);

      if (transcript.includes("submit")) {
        const email = this.state.email.replaceAll(" ", "");
        let password = this.state.password.replace(" submit", "");
        password = password.replace(" something", "");
        const user = {
          email,
          password,
        };

        this.props.login(user);
        mic.stop();
      } else if (transcript.includes("password")) {
        const last = transcript.indexOf("word is");
        let realTranscript = transcript.slice(last + 8);
        realTranscript = realTranscript.replace(" something", "");
        realTranscript = realTranscript.replace(" submit", "");
        this.setState({ password: realTranscript });
      } else if (transcript.includes("email")) {
        const last = transcript.indexOf("email is");
        let realTranscript = transcript.slice(last + 8);
        realTranscript = realTranscript.replace("my pas", "");
        realTranscript = realTranscript.replace("my ", "");

        if (realTranscript.includes("at")) {
          realTranscript = realTranscript.replace("at", "@");
          this.setState({ email: realTranscript });
        } else {
          this.setState({ email: realTranscript });
        }
      }

      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  }

  setIsListening(e) {
    // e.preventDefault();
    this.setState({ isListening: !this.state.isListening }, () => {
      if (this.state.isListening) {
        mic.start();
      } else {
        mic.stop();
      }
    });
  }

  // Handle field updates (called in the render method)
  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.login(user).then(() => this.props.history.push("/profile"));
  }

  loginDemo() {
    this.setState({
      email: "feifei.erhu@gmail.com",
      password: "password",
    });

    this.props
      .login({
        email: "feifei.erhu@gmail.com",
        password: "password",
      })
      .then(() => this.props.history.push("/profile"));
  }

  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li style={{ marginBottom: 10 }} key={`error-${i}`}>
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
          <div className="form__content">
            <form className="form-inner" onSubmit={this.handleSubmit}>
              <div className="form__field">
                <i>
                  <FaUser style={{ marginRight: 10 }} />
                </i>
                <input
                  className="input-holder"
                  type="text"
                  value={this.state.email}
                  onChange={this.update("email")}
                  placeholder="Email"
                />
              </div>
              <br />
              <div className="form__field">
                <i>
                  <RiLockPasswordFill style={{ marginRight: 10 }} />
                </i>
                <input
                  className="input-holder"
                  type="text"
                  value={this.state.password}
                  onChange={this.update("password")}
                  placeholder="Password"
                />
              </div>
              <br />
              <div>
                <button className="button form__submit" type="submit">
                  <span className="button__text">LOG IN NOW</span>
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

              <button
                className="button form__submit"
                type="submit"
                onClick={this.loginDemo}
              >
                <span className="button__text">Demo User</span>
                <i>
                  <GrFormNextLink />
                </i>
              </button>
              <div className="mic">
                {this.state.isListening ? (
                  <div className="mic-on" style={{ marginTop: "5%" }}>
                    <span
                      className="button form__submit micro"
                      onClick={this.setIsListening.bind(this)}
                    >
                      Stop Voice Input
                    </span>
                    <div class="loader">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span id="mic">🎙️</span>
                  </div>
                ) : (
                  <span
                    className="button form__submit micro"
                    onClick={this.setIsListening.bind(this)}
                  >
                    Log in with Voice
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
