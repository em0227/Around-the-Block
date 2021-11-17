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

  constructor(props){
    super(props)
  }

  componentDidMount(){
    console.log(this.props)
      this.props.fetchEvents()  
  }; 

  onChange(a, b, c) {
    console.log(a, b, c);
  }
  render() {
    // const {events} = this.props.events;
    console.log("Hello")
    const contents = this.props.events.map(event => {
      return (
        <div className="img-container">
             <div className='event-content'>
                   <div style={contentStyle}>
                    <img
                      style={imgSize}
                      src="https://atb-photos.s3.amazonaws.com/shell.jpeg"/></div>
                        <div class="event-container">
                        <div class='event-time'>{event.time}</div>
                        <div class='event-title'>{event.name}</div>
                  </div>
                  <button className="join-button">SHOW</button>
            </div>
         </div>

      )

    })
    return (
      <div>
      {this.props.events ? 
        <div className="img-background">
          <Carousel autoplay dots="arb-carousel" afterChange={this.onChange}>
            {contents}</Carousel>
        </div> : "" }

      </div>
      )
  }
}


export default MainPage;
