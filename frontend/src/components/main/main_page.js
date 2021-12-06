import React from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchEvents();
    // this.props.fetchUsers()
  }

  onChange(a, b, c) {
    // console.log(a, b, c);
    setInterval(() => {}, 5000);
  }
  render() {
    const img = {
      0: "https://atb-photos.s3.amazonaws.com/shell.jpeg",
      1: "https://atb-photos.s3.amazonaws.com/painting.jpeg",
      2: "https://atb-photos.s3.amazonaws.com/green.jpeg",
      3: "https://atb-photos.s3.amazonaws.com/aniversary.jpeg",
      4: "https://atb-photos.s3.amazonaws.com/comedy.jpeg",
      5: "https://atb-photos.s3.amazonaws.com/plants.jpeg",
      6: "https://atb-photos.s3.amazonaws.com/galary.jpeg",
      7: "https://atb-photos.s3.amazonaws.com/dating.jpeg",
      8: "https://atb-photos.s3.amazonaws.com/sidewalk.jpeg",
      9: "https://atb-photos.s3.amazonaws.com/dashboard_bg.jpeg",
    };
    const contents = this.props.events.map((event, idx) => {
      return (
        <div className="event-container" key={idx}>
          <div className="inner-container">
            <img className="img" src={img[idx]} />
            <div className="event-content">
              <div className="inner-img-container">
                <Link className="main-event-img" to={`/events/${event._id}`}>
                  <img className="main-event-img" src={event.imageUrl} />{" "}
                </Link>
              </div>
              <div className="event-info">
                <div className="event-text">{event.time}</div>
                <div className="event-text name">{event.name}</div>
                <div className="event-text-des">{event.description}</div>
                <div className="event-text">{event.location}</div>

                <Link className="join-button" to={`/events/${event._id}`}>
                  <span className="join-button-show">Show</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <div className="app-description">
          <Typewriter
            className="app-description-words"
            onInit={(typewriter) => {
              typewriter
                .typeString("We are here to help the elderly meet new friends!")
                .pauseFor(500)
                .deleteAll()
                .typeString(
                  // "Our larger fonts and designs accommodate visual impairments."
                  "Our large font size and simple design is user-friendly."
                )
                .deleteAll()
                .typeString(
                  // "Our voice recognition makes sign up easy for the hearing-impaired. Try it now!"
                  "Our voice recognition makes sign up easy for users. Try it now! "
                )
                .pauseFor(500)
                .deleteAll()
                .typeString(
                  // "We are here to help senior citizens make friends!"
                  "We are here to help the elderly meet new friends!"
                )
                .pauseFor(500)
                .deleteAll()
                .typeString(
                  // "Our larger fonts and designs accommodate visual impairments."
                  "Our large font size and simple design is user-friendly."
                )
                .deleteAll()
                .typeString(
                  // "Our voice recognition makes sign up easy for the hearing-impaired. Try it now!"
                  "Our voice recognition makes sign up easy for users. Try it now! "
                )
                .pauseFor(500)
                // .deleteAll()
                // .typeString("We are here to help senior citizens make friends!")
                // .pauseFor(500)
                // .deleteAll()
                // .typeString(
                //   "Our larger fonts and designs accommodate visual impairments."
                // )
                // .deleteAll()
                // .typeString(
                //   "Our voice recognition makes sign up easy for the hearing-impaired. Try it now!"
                // )
                // .pauseFor(500)
                // .deleteAll()
                // .typeString("We are here to help senior citizens make friends!")
                // .pauseFor(500)
                // .deleteAll()
                // .typeString(
                //   "Our larger fonts and design choices accommodate visual impairments."
                // )
                // .deleteAll()
                // .typeString(
                //   "Our voice recognition makes sign up easy for the hearing-impaired. Try it now!"
                // )
                // .pauseFor(1000)
                // .deleteAll()
                .start();
            }}
          />
        </div>
        {this.props.events ? (
          <div>
            <Carousel autoplay dots="arb-carousel" afterChange={this.onChange}>
              {contents}
            </Carousel>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default MainPage;
