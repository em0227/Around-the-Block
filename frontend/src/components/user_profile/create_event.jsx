import React from "react";

class CreateEventForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.event.name,
      description: this.props.event.description,
      location: this.props.event.location,
      imageUrl: this.props.event.imageUrl,
      time: this.props.event.time,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
  }
  // Once the user has been authenticated, redirect to the Tweets page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      // this.props.history.push("/events");
    }

    // Set or clear errors
    this.setState({ errors: nextProps.errors });
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

    let event = {
      name: this.state.name,
      description: this.state.description,
      location: this.state.location,
      imageUrl: this.state.imageUrl,
      time: this.state.time,
    };

    this.props.createEvent(event, this.props.history);
  }

  handleUpdate(e) {
    e.preventDefault();
    let event = {
      name: this.state.name,
      description: this.state.description,
      location: this.state.location,
      imageUrl: this.state.imageUrl,
      time: this.state.time,
    };

    this.props.updateEvent(event).then(() => this.props.history.push('/profile'));
    
  }

  // Render the session errors if there are any
  renderErrors() {
    return (
      <div>
        {(this.props.errors || []).map((error, i) => (
          <li style={{ marginBottom: 10, color: "red" }} key={i}>
            {error}
          </li>
        ))}
      </div>
    );
  }

  render() {
    let { event } = this.props
    console.log(event);
    if (this.props.formType === "create") {
      return (
        <div className="event-container">
          <div className="event">
            <div className="event__content">
              <form className="event-inner" onSubmit={this.handleSubmit}>
                <div className="event__field">
                  <input
                    className="input-holder"
                    type="text"
                    value={this.state.name}
                    onChange={this.update("name")}
                    placeholder="Event title..."
                  />
                </div>
                <div className="event__field">
                  <input
                    className="input-holder"
                    type="text"
                    value={this.state.description}
                    onChange={this.update("description")}
                    placeholder="What to do..."
                  />
                </div>
                <div className="event__field">
                  <input
                    className="input-holder"
                    type="text"
                    value={this.state.time}
                    onChange={this.update("time")}
                    placeholder="When...."
                  />
                </div>
                <div className="event__field">
                  <input
                    className="input-holder"
                    type="text"
                    value={this.state.location}
                    onChange={this.update("location")}
                    placeholder="Your location..."
                  />
                </div>

                <div className="event__field">
                  <input
                    className="input-holder"
                    type="text"
                    value={this.state.imageUrl}
                    onChange={this.update("imageUrl")}
                    placeholder="Your pictures go here..."
                  />
                </div>
                <button className="button event__submit" type="submit">
                  <span className="button__text">CREATE EVENT</span>
                </button>
                <br />
                {this.renderErrors()}
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="event-container">
          <div className="event">
            <div className="event__content">
              <form className="event-inner" onSubmit={this.handleUpdate}>
                <div className="event__field">
                  <input
                    className="input-holder"
                    type="text"
                    value={this.state.name}
                    onChange={this.update("name")}
                    placeholder="Event title..."
                  />
                </div>
                <div className="event__field">
                  <input
                    className="input-holder"
                    type="text"
                    value={this.state.description}
                    onChange={this.update("description")}
                    placeholder="What to do..."
                  />
                </div>
                <div className="event__field">
                  <input
                    className="input-holder"
                    type="text"
                    value={this.state.time}
                    onChange={this.update("time")}
                    placeholder="When...."
                  />
                </div>
                <div className="event__field">
                  <input
                    className="input-holder"
                    type="text"
                    value={this.state.location}
                    onChange={this.update("location")}
                    placeholder="Your location..."
                  />
                </div>

                <div className="event__field">
                  <input
                    className="input-holder"
                    type="text"
                    value={this.state.imageUrl}
                    onChange={this.update("imageUrl")}
                    placeholder="Your pictures go here..."
                  />
                </div>
                <button className="button event__submit" type="submit">
                  <span className="button__text">UPDATE EVENT</span>
                </button>
                <br />
                {this.renderErrors()}
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default CreateEventForm;
