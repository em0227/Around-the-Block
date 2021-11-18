import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './date_picker'


class EventForm extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.event

    }

    handleSubmit(e){
        e.preventDefault()
        const event = {
            name: this.state.name, 
            description: this.state.description,
            time: this.time,
            lat: ,
            long: ,
            hostId: this.props.currentUser,
            imageUrl: 

            
        } 
        this.props.processForm(event) 
    
    }

    

    update(field) {
        console.log(field)
        return e =>
          this.setState({ [field]: e.currentTarget.value });
    }


    handleDateChange = (newDate) => {
        this.setState({['date']: newDate})
    }

    render() {
        return (
            <form className="new-event-form" onSubmit={this.handleSubmit.bind(this)} >
                <h2>{this.props.formType}</h2>
                <p>Examples include book clubs, knitting, folfing, movie nights, etc </p>
                
                <div className="name-box">
                <label>Name</label>
                    <input type="text" onChange={this.update('name')} />
                </div>
                
                <div className="description-box">
                <label>Description </label>
                    <textarea onChange={this.update('description')} />
                </div>

                <div className="time-box">
                <label>Date </label>
                    <DatePicker date={this.state.date} onDateChange={this.handleDateChange} />
                </div>

                <label>Time </label>
                <input type="time" min="09:00" max="21:00" onChange={this.update('timestamp')} required />
                <small>Events can be held between 9am and 9pm</small>

                
                {this.props.date && this.state.timestamp ? 
                    //dd-mm-yyyy: DatePicker return format 
                    <div>
                    {this.time = new Date(parseInt(this.state.date.slice(6,10)), 
                    parseInt(this.state.date.slice(3,5)), 
                    parseInt(this.state.date.slice(0,2)),
                    parseInt(this.state.timestamp(0,2)),
                    parseInt(this.state.timestamp(3,5))
                    )}
                    </div> : ""
                }
                <button className="create" type="submit" >Create</button>


            </form>
        )
    
    }

export default EventForm;