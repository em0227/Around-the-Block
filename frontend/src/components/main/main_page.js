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
      <div>
        <h1>This is events index</h1>
        {/* <footer>Copyright &copy; 2019 Chirper</footer> */}
        <Carousel autoplay dots="arb-carousel" afterChange={this.onChange}>
          <div>
            <div style={contentStyle}>
              <img
                style={imgSize}
                src="https://envato-shoebox-0.imgix.net/7909/a877-f58b-41d7-bca7-27d4e6710ed3/Senior+outdoor+fitness+005.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=1600&s=26d627939ae54f93d6313b195281b314"
              />
            </div>
          </div>
          <div>
            <div style={contentStyle}>
              <img
                style={imgSize}
                src="http://memoriesplusadp.com/wp-content/uploads/2018/06/old-age-home.jpg"
              />
            </div>
          </div>
          <div>
            <div style={contentStyle}>
              <img
                style={imgSize}
                src="https://thumbs.dreamstime.com/z/side-view-happy-senior-woman-smiling-drawing-as-recreational-activity-therapy-outdoors-together-group-131628555.jpg"
              />
            </div>
          </div>
          <div>
            <div style={contentStyle}>
              <img
                style={imgSize}
                src="https://cf.ltkcdn.net/seniors/images/std-lg/235654-1200x773-ideas-fun-activities-elderly.webp"
              />
            </div>
          </div>
        </Carousel>
      </div>
    );
  }
}

export default MainPage;
