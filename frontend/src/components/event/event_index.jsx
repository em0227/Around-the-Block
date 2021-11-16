import React from 'react';
import EventIndexItem from './event_index_item';


class EventIndex extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
      this.props.fetchEvents()  
  }; 
  
  render(){
    const {events} = this.props;
    const EventItems = (events || []).map((event) => (
      <EventIndexItem key={event.id} event={event}/>
    ));
    return (
      <div classsName="event-index-page">
          <div className='event-lines'>{EventItems}</div>
      </div>
    )
  }

}

export default EventIndex