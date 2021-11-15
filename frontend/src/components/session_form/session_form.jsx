import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";



class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isSubmited: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginDemo = this.loginDemo.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.errors.length === 0 && this.state.isSubmited === true) {
      this.props.closeModal();
    }
    return true;
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.target.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
    this.setState({isSubmited: true})
  }

  loginDemo() {
    const demoUser = {
      email: "demo@gmail.com",
      password: "password123",
    };
    this.props.processForm(demoUser);
    this.props.closeModal();
  }

  renderErrors() {
    return (
      <div style={{marginTop: 20, lineHeight: 1}}>
        {this.props.errors.map((error, i) => (
          <li style={{width: '100%'}} key={`${i}`}>{error}</li>
        ))}
      </div>
    );
  }

  render() {
    const { openModal } = this.props
    if (this.props.formType === "login") {
      return (
        <div className="login-form-container">
          <div className="close-modal-button">
            <AiOutlineCloseCircle
              style={{ width: 30, height: 30 }}
              onClick={this.props.closeModal}
            />
          </div>
          <div className="modal-header">
            <p style={{ fontSize: 20, fontWeight: 50 }}>Log in</p>
            <button className="btn" onClick={() => openModal("signup")}>
              Register
            </button>
          </div>

          <form className="form-box">
            <br />

            <div className="login-form">
              <br />
              <div className="form-input-wrapper">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  value={this.state.email}
                  onChange={this.update("email")}
                  className="form-input"
                />
              </div>
              {this.renderErrors()}
              <br />
              <div className="form-input-wrapper">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.update("password")}
                  className="form-input"
                />
              </div>

              <br />
              <div className="login-form-bottom">
                <input
                  className="submit-form-button"
                  type="submit"
                  value="Log in"
                  onClick={this.handleSubmit}
                />
                <br />
                <button type="button" className="btn" onClick={this.loginDemo}>
                  Demo User
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className="login-form-container">
          <AiOutlineCloseCircle
            className="close-modal-button"
            onClick={this.props.closeModal}
            style={{ marginLeft: 330, width: 30, height: 30 }}
          />
          <form onSubmit={this.handleSubmit} className="form-box">
            <br />
            <p style={{ fontSize: 28, fontWeight: 80 }}>Sign up</p>
            <div className="login-form">
              <br />
              <div className="form-input-wrapper">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  value={this.state.email}
                  onChange={this.update("email")}
                  className="form-input"
                />
              </div>
              {this.renderErrors()}
              <br />
              <div className="form-input-wrapper">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.update("password")}
                  className="form-input"
                />
              </div>

              <br />
              <input
                className="submit-form-button"
                type="submit"
                value="Sign up"
              />
            </div>
          </form>
        </div>
      );
    }
  }
}

export default SessionForm;
//this.props.processForm(user) => similar to action, actions container(mDTP) it either login or signup user