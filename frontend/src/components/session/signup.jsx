import React from "react";
import { withRouter } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrLinkNext } from "react-icons/gr";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push("/login");
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.signup(user, this.props.history);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="form-container">
        <div className="screen">
          <div className="screen__content">
            <form className="signup" onSubmit={this.handleSubmit}>
              <div className="signup__field">
                <br />
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.update("name")}
                  placeholder="Name"
                />
              </div>
              <br />
              <div className="signup__field">
                <i>
                  <FaUser />
                </i>
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.update("email")}
                  placeholder="Email"
                />
              </div>
              <br />
              <div className="signup__field">
                <i className="signup__icon fas fa-lock">
                  <RiLockPasswordFill />
                </i>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.update("password")}
                  placeholder="Password"
                />
              </div>
              <br />
              <div className="signup__field">
                <input
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={this.update("confirmPassword")}
                  placeholder="Confirm Password"
                />
              </div>
              <br />
              <div>
                <button className="button signup__submit" type="submit">
                  <span className="button__text">LOG IN NOW</span>
                  <i>
                    <GrLinkNext />
                  </i>
                </button>
                {this.renderErrors()}
              </div>
              <div class="screen__background">
                <span class="screen__background__shape screen__background__shape4"></span>
                <span class="screen__background__shape screen__background__shape3"></span>
                <span class="screen__background__shape screen__background__shape2"></span>
                <span class="screen__background__shape screen__background__shape1"></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);
