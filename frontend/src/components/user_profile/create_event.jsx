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
    if (this.props.formType === "update") {
      this.props.fetchEvent(this.props.match.params.eventId);
    }
  }
  // Once the user has been authenticated, redirect to the Tweets page
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.currentUser === true) {
  //     // this.props.history.push("/events");
  //   }

  //   // Set or clear errors
  //   this.setState({ errors: nextProps.errors });
  // }

  // Handle field updates (called in the render method)
  update(field) {
    return (e) => {
      e.preventDefault();
      this.setState({
        [field]: e.currentTarget.value,
      });
      if (
        field === "imageUrl" &&
        e.currentTarget.classList.value.includes("image-buttons")
      ) {
        let prevSelected = document.querySelector(".selected");
        if (prevSelected) {
          prevSelected.classList.remove("selected");
        }
        e.currentTarget.classList.add("selected");
      }
    };
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
      id: this.props.event._id,
      name: this.state.name,
      description: this.state.description,
      location: this.state.location,
      imageUrl: this.state.imageUrl,
      time: this.state.time,
    };

    this.props
      .updateEvent(event)
      .then(() => this.props.history.push("/profile"));
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
    let { event } = this.props;
    const submitButton =
      this.props.formType === "create" ? "CREATE EVENT" : "UPDATE EVENT";
    const submit =
      this.props.formType === "create" ? this.handleSubmit : this.handleUpdate;

    return (
      <div className="event-container">
        <div className="event">
          <div className="event__content">
            <form className="event-inner" onSubmit={submit}>
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
                  placeholder="What's the event about ..."
                />
              </div>
              <div className="event__field">
                <input
                  className="input-holder"
                  type="datetime-local"
                  value={this.state.time}
                  onChange={this.update("time")}
                />
              </div>
              <div className="event__field">
                <input
                  className="input-holder"
                  type="text"
                  value={this.state.location}
                  onChange={this.update("location")}
                  placeholder="Event location ..."
                />
              </div>

              <div className="event__field">
                <input
                  className="input-holder"
                  type="text"
                  value={this.state.imageUrl}
                  onChange={this.update("imageUrl")}
                  placeholder="Here goes your event image url..."
                />
              </div>
              <br />
              <div className="event-image-buttons">
                <label>Or choose a template image:</label>
                <br />
                <div>
                  <button
                    style={{
                      backgroundImage:
                        "url('https://atb-photos.s3.amazonaws.com/cook.jpeg')",
                    }}
                    value="https://atb-photos.s3.amazonaws.com/cook.jpeg"
                    onClick={this.update("imageUrl")}
                    className="image-buttons"
                  ></button>
                  <button
                    style={{
                      backgroundImage:
                        "url('https://atb-photos.s3.amazonaws.com/sing.jpeg')",
                    }}
                    value="https://atb-photos.s3.amazonaws.com/sing.jpeg"
                    onClick={this.update("imageUrl")}
                    className="image-buttons"
                  ></button>
                  <button
                    style={{
                      backgroundImage:
                        "url('https://atb-photos.s3.amazonaws.com/paint.jpeg')",
                    }}
                    value="https://atb-photos.s3.amazonaws.com/paint.jpeg"
                    onClick={this.update("imageUrl")}
                    className="image-buttons"
                  ></button>
                  <button
                    style={{
                      backgroundImage:
                        "url('https://atb-photos.s3.amazonaws.com/read.jpeg')",
                      backgroundImageSize: "260px 180px",
                    }}
                    value="https://atb-photos.s3.amazonaws.com/read.jpeg"
                    onClick={this.update("imageUrl")}
                    className="image-buttons"
                  ></button>
                  <button
                    style={{
                      backgroundImage:
                        "url('https://atb-photos.s3.amazonaws.com/dog.jpeg')",
                    }}
                    value="https://atb-photos.s3.amazonaws.com/dog.jpeg"
                    onClick={this.update("imageUrl")}
                    className="image-buttons"
                  ></button>
                  <button
                    style={{
                      backgroundImage:
                        "url('https://atb-photos.s3.amazonaws.com/dance.jpeg')",
                    }}
                    value="https://atb-photos.s3.amazonaws.com/dance.jpeg"
                    onClick={this.update("imageUrl")}
                    className="image-buttons"
                  ></button>
                  <button
                    style={{
                      backgroundImage:
                        "url('https://atb-photos.s3.amazonaws.com/nature.jpeg')",
                    }}
                    value="https://atb-photos.s3.amazonaws.com/nature.jpeg"
                    onClick={this.update("imageUrl")}
                    className="image-buttons"
                  ></button>
                  <button
                    style={{
                      backgroundImage:
                        "url('https://atb-photos.s3.amazonaws.com/shop.jpg')",
                    }}
                    value="https://atb-photos.s3.amazonaws.com/shop.jpg"
                    onClick={this.update("imageUrl")}
                    className="image-buttons"
                  ></button>
                  <button
                    style={{
                      backgroundImage:
                        "url('https://atb-photos.s3.amazonaws.com/exercise.jpg')",
                    }}
                    value="https://atb-photos.s3.amazonaws.com/exercise.jpg"
                    onClick={this.update("imageUrl")}
                    className="image-buttons"
                  ></button>
                </div>
              </div>

              <button className="button event__submit" type="submit">
                <span className="button__text">{submitButton}</span>
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

export default CreateEventForm;
