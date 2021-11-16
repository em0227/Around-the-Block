import React from "react";
import { Link } from "react-router-dom";


class EventIndexItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        const {event} = this.props;

        return (
            <div>
                <div className="event-section">
                    <Link to={`events/${event.id}`}>
                        <div className="group-event-each" src={event.vdUrl}></div>
                    </Link>
                    <div className="group-event-title-container">
                           
                                {/* <div className="group-event-title">{event.name}</div>
                                <div className="group-event-creator">{event.hostId.name}</div>
                                <div className="group-event-creator">{event.description}</div>
                                <div className="group-event-creator">{event.time}</div>
                                <div className="group-event-creator">{event.guests.map(guest => {guest.ref})}</div>
                             */}
                                <div className="group-event-title">Walk Dogs with Snigdha</div>
                                <div className="group-event-creator">11/21/2021/ 3pm</div>
                                <div className="group-event-creator">Emily, Hien, Feifei</div>
                            
                    </div>


                </div>

            </div>
           
        )

    }


}

export default EventIndexItem