import React from "react";
import { Carousel } from "antd";


const contentStyle = {
  height: "600px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const imgSize = {
  width: "100vw",
  height: "100vh",
}
class MainPage extends React.Component {
  onChange(a, b, c) {
    console.log(a, b, c);
  }
  render() {
    return (
      <div className="img-background">
        {/* <h1>Recent Evnts</h1> */}
        {/* <footer>Copyright &copy; 2019 Chirper</footer> */}
        <Carousel autoplay dots="arb-carousel" afterChange={this.onChange}>
          <div className="img-container">
            <div className='event-content'>
                  <div style={contentStyle}>
                    <img
                      style={imgSize}
                      src="https://atb-photos.s3.amazonaws.com/shell.jpeg"/></div>
                        <div class="event-container">
                        <div class='event-time'>11/17/2021</div>
                        <div class='event-title'>Walk Dogs with Snigdha</div>
                  </div>
                  <button className="join-button">SHOW</button>
            </div>
          </div>

          <div className="img-container">
            <div style={contentStyle}>
              <img
                style={imgSize}
                src="https://atb-photos.s3.amazonaws.com/painting.jpeg"/></div>
                  <div class="event-container">
                  <div class='event-time'>11/18/2021</div>
                  <div class='event-title'>Tea Party with Hien</div>
            </div>
             <button className="join-button">SHOW</button>
          </div>

          <div className="img-container">
            <div style={contentStyle}>
              <img
                style={imgSize}
                src="https://atb-photos.s3.amazonaws.com/green.jpeg"/></div>
                  <div class="event-container">
                  <div class='event-time'>11/19/2021</div>
                  <div class='event-title'>Anniversary with Emily</div>
            </div>
            <button className="join-button">SHOW</button>
          </div>

            <div className="img-container">
            <div style={contentStyle}>
              <img
                style={imgSize}
                src="https://atb-photos.s3.amazonaws.com/aniversary.jpeg"/></div>
                  <div class="event-container">
                  <div class='event-time'>11/20/2021</div>
                  <div class='event-title'>Concert with Feifei</div>
            </div>
            <button className="join-button">SHOW</button>
          </div>


          <div className="img-container">
            <div style={contentStyle}>
              <img
                style={imgSize}
                src="https://atb-photos.s3.amazonaws.com/comedy.jpeg"/></div>
                  <div class="event-container">
                  <div class='event-time'>11/21/2021</div>
                  <div class='event-title'>Story Reading with Evan</div>
            </div>
            <button className="join-button">SHOW</button>
          </div>


          <div className="img-container">
            <div style={contentStyle}>
              <img
                style={imgSize}
                src="https://atb-photos.s3.amazonaws.com/plants.jpeg"/></div>
                  <div class="event-container">
                  <div class='event-time'>11/22/2021</div>
                  <div class='event-title'>Plating with Taylor</div>
            </div>
            <button className="join-button">SHOW</button>
          </div>

          <div className="img-container">
            <div style={contentStyle}>
              <img
                style={imgSize}
                src="https://atb-photos.s3.amazonaws.com/galary.jpeg"/></div>
                  <div class="event-container">
                  <div class='event-time'>11/23/2021</div>
                  <div class='event-title'>Galary Time with Kevin</div>
            </div>
            <button className="join-button">SHOW</button>
          </div>

          <div className="img-container">
            <div style={contentStyle}>
              <img
                style={imgSize}
                src="https://atb-photos.s3.amazonaws.com/dating.jpeg"/></div>
                  <div class="event-container">
                  <div class='event-time'>11/24/2021</div>
                  <div class='event-title'>Meetup at Raz'</div>
            </div>
            <button className="join-button">SHOW</button>
          </div>

          <div className="img-container">
            <div style={contentStyle}>
              <img
                style={imgSize}
                src="https://atb-photos.s3.amazonaws.com/sidewalk.jpeg"/></div>
                  <div class="event-container">
                  <div class='event-time'>11/25/2021</div>
                  <div class='event-title'>Fishing with Darren</div>
            </div>
            <button className="join-button">SHOW</button>
          </div>
        </Carousel>
      </div>
    );
  }
}

export default MainPage;
