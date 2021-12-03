import React from "react";
import { Carousel } from "antd";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect"

class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
 
    this.props.fetchEvents();
    this.props.fetchUsers()
  }

  onChange(a, b, c) {
    // console.log(a, b, c);
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
              <div className="event-text">{event.time}</div>
              <div className="event-text-name">{event.name}</div>
              <div className="event-text">{event.description}</div>

              <Link className="join-button" to={`/events/${event._id}`}>
                Show
              </Link>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <div className="app-description"> 
        <Typewriter 
        onInit={(typewriter) => {
          typewriter
            .typeString("I am an App who helps elderly to social :)")
            .pauseFor(500)
            .deleteAll()
            .typeString("You can sign up with your voice!")
            .pauseFor(500)
            .deleteAll()
            .typeString("Now click on the Signup button on my right")
            .deleteAll()
            .typeString("My friend Emily is waiting for you!")
            .pauseFor(1000)
            .deleteAll()
            .typeString("I am an App who helps elderly to social :)")
            .deleteAll()
            .typeString("You can sign up with your voice!")
            .deleteAll()
            .typeString("Now click on the Signup button on my right")
            .deleteAll()
            .typeString("My friend Emily is waiting for you!")
            .pauseFor(1000)
            .deleteAll()
            .start();
        }
        } 
        />
      
        </div>
        {this.props.events ? (
          <div className="img-background">
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
