import React from "react";
import { Carousel } from "antd";

const contentStyle = {
  height: "600px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
// const imgSize = {
//   width: "100vw",
//   height: "100vh",
// };
class MainPage extends React.Component {
  onChange(a, b, c) {
    console.log(a, b, c);
  }
  render() {
    return (
      <div>
        <Carousel autoplay dots="arb-carousel" afterChange={this.onChange}>
          <div className="event-container">
            <div className="inner-container">
              <img
                className="img"
                src="https://atb-photos.s3.amazonaws.com/shell.jpeg"
              />
              <div className="event-content">
                <div className="event-text">11/17/2021</div>
                <div className="event-text">Tea Party with FeiFei</div>
                <button className="join-button">SHOW</button>
              </div>
            </div>
          </div>

          <div className="event-container">
            <div className="inner-container">
              <img
                className="img"
                src="https://atb-photos.s3.amazonaws.com/green.jpeg"
              />
              <div className="event-content">
                <div className="event-text">11/17/2021</div>
                <div className="event-text">Walk Dogs with Snigdha</div>
                <button className="join-button">SHOW</button>
              </div>
            </div>
          </div>

          <div className="event-container">
            <div className="inner-container">
              <img
                className="img"
                src="https://atb-photos.s3.amazonaws.com/sidewalk.jpeg"
              />
              <div className="event-content">
                <div className="event-text">11/17/2021</div>
                <div className="event-text">Anniversary with Emily</div>
                <button className="join-button">SHOW</button>
              </div>
            </div>
          </div>

          <div className="event-container">
            <div className="inner-container">
              <img
                className="img"
                src="https://atb-photos.s3.amazonaws.com/painting.jpeg"
              />
              <div className="event-content">
                <div className="event-text">11/17/2021</div>
                <div className="event-text">Story Reading with Hien</div>
                <button className="join-button">SHOW</button>
              </div>
            </div>
          </div>
          {/* 
          <div className="event-container">
            <div style={contentStyle}>
              <img
                style={imgSize}
                src="https://atb-photos.s3.amazonaws.com/painting.jpeg"
              />
            </div>
            <div>
              <div className="event-time">11/18/2021</div>
              <div className="event-title">Tea Party with Hien</div>
            </div>
            <button className="join-button">SHOW</button>
          </div>

          <div className="event-container">
            <div style={contentStyle}>
              <img
                style={imgSize}
                src="https://atb-photos.s3.amazonaws.com/green.jpeg"
              />
            </div>
            <div>
              <div className="event-time">11/19/2021</div>
              <div className="event-title">Anniversary with Emily</div>
            </div>
            <button className="join-button">SHOW</button>
          </div>

          <div className="event-container">
            <div style={contentStyle}>
              <img
                style={imgSize}
                src="https://atb-photos.s3.amazonaws.com/aniversary.jpeg"
              />
            </div>
            <div>
              <div className="event-time">11/20/2021</div>
              <div className="event-title">Concert with Feifei</div>
            </div>
            <button className="join-button">SHOW</button>
          </div>

          <div className="event-container">
            <div style={contentStyle}>
              <img
                style={imgSize}
                src="https://atb-photos.s3.amazonaws.com/comedy.jpeg"
              />
            </div>
            <div>
              <div className="event-time">11/21/2021</div>
              <div className="event-title">Story Reading with Evan</div>
            </div>
            <button className="join-button">SHOW</button>
          </div>

          <div className="event-container">
            <div style={contentStyle}>
              <img
                style={imgSize}
                src="https://atb-photos.s3.amazonaws.com/plants.jpeg"
              />
            </div>
            <div>
              <div className="event-time">11/22/2021</div>
              <div className="event-title">Plating with Taylor</div>
            </div>
            <button className="join-button">SHOW</button>
          </div>

          <div className="event-container">
            <div style={contentStyle}>
              <img
                style={imgSize}
                src="https://atb-photos.s3.amazonaws.com/galary.jpeg"
              />
            </div>
            <div>
              <div className="event-time">11/23/2021</div>
              <div className="event-title">Galary Time with Kevin</div>
            </div>
            <button className="join-button">SHOW</button>
          </div>

          <div className="event-container">
            <div style={contentStyle}>
              <img
                style={imgSize}
                src="https://atb-photos.s3.amazonaws.com/dating.jpeg"
              />
            </div>
            <div>
              <div className="event-time">11/24/2021</div>
              <div className="event-title">Meetup at Raz'</div>
            </div>
            <button className="join-button">SHOW</button>
          </div>

          <div className="event-container">
            <div style={contentStyle}>
              <img
                style={imgSize}
                src="https://atb-photos.s3.amazonaws.com/sidewalk.jpeg"
              />
            </div>
            <div>
              <div className="event-time">11/25/2021</div>
              <div className="event-title">Fishing with Darren</div>
            </div>
            <button className="join-button">SHOW</button>
          </div> */}
        </Carousel>
      </div>
    );}
    };

export default MainPage;
