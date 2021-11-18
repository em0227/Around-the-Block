import React from "react";
import { Link } from "react-router-dom";

class FutureEvent extends React.Component {
//   constructor(props) {
//     super(props);
//   }
  // componentDidMount() {
  //   this.props.fetchEvent(this.props.event._id);
    
  // }
  render() {

    return (
    <div>
      <div className="profile-event-page">
          
          <div className="p-event-container-title">UPCOMING EVENTS</div>

                <div className="profile-event-container">
                    
                            <div className="profile-event-content">
                                    <img
                                        className="p-e-img"
                                        src="https://atb-photos.s3.amazonaws.com/dinning.png"
                                    />
                                    <div clasName="profile-event-detials">
                                            <div className="p-event-time">
                                                {/* <div className="p-e-t">{this.props.eventsJoined.time}</div> */}
                                                <div className="p-e-t">6pm Thur. 11/21/2021</div>    
                                            </div>
                                            <div className="p-event-name">
                                                {/* <div className="p-e-n">{this.props.eventsJoined.name}</div>  */}
                                                <div className="p-e-n">Cooking Party with Evan
                                                </div> 
                                            </div>
                                            <div className="p-event-desc">
                                                {/* <div className="p-e-d">{this.props.eventsJoined.description}</div>  */}
                                                <div className="p-e-d">We are gonna cook with GASSSS</div>
                                            </div>        
                                    </div>
                                </div>                    
                </div>
     
      </div>

      <div className="profile-event-page">
          
          <div className="p-event-container-title">HOST EVENTS</div>

                <div className="profile-event-container">
                    
                            <div className="profile-event-content">
                                    <img
                                        className="p-e-img"
                                        src="https://atb-photos.s3.amazonaws.com/watchtv.png"
                                    />
                                    <div clasName="profile-event-detials">
                                            <div className="p-event-time">
                                                {/* <div className="p-e-t">{this.props.eventsJoined.time}</div> */}
                                                <div className="p-e-t">8pm Sun. 11/28/2021</div>    
                                            </div>
                                            <div className="p-event-name">
                                                {/* <div className="p-e-n">{this.props.eventsJoined.name}</div>  */}
                                                <div className="p-e-n">Popcorn Time with Emily
                                                </div> 
                                            </div>
                                            <div className="p-event-desc">
                                                {/* <div className="p-e-d">{this.props.eventsJoined.description}</div>  */}
                                                <div className="p-e-d">All guests will bring their favotate popcorns</div>
                                            </div>        
                                    </div>
                                </div>                    
                </div>
     
      </div>



<div className="profile-event-page">
          
          <div className="p-event-container-title">FRIENDS</div>

                <div className="profile-friends-container">
                    
                            <div className="profile-event-content">
                                    <img
                                        className="p-e-i"
                                        src="https://atb-photos.s3.amazonaws.com/emily.png"
                                    />
                                    <img
                                        className="p-e-i"
                                        src="https://atb-photos.s3.amazonaws.com/feifei2.JPG"
                                    />
                                    <img
                                        className="p-e-i"
                                        src="https://atb-photos.s3.amazonaws.com/hien.png"
                                    />
                                    <img
                                        className="p-e-i"
                                        src="https://atb-photos.s3.amazonaws.com/sigdha.png"
                                    />
                                        
                                    
                                </div>                    
                </div>
     
      </div>







      </div>
    )
  }
}

export default FutureEvent;