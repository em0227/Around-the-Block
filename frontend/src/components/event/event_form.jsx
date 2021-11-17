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
        const channel = {
            name: this.state.channelName, 
            description: this.state.channelDescription,
            dm: false
        } 
        this.props.createChannel(channel)
        // this.state.memberIds.unshift(this.props.currentUser)
        // if (this.state.memberIds.length > 2) {
        //     
        this.setState({submittedMessage: true})
       
        // } 
    
    }

    componentDidUpdate(prevProps){
        // console.log("im updating")
        // if (prevProps.currentView !== this.props.currentView){
        //     console.log("view changed")
        // }
        // if (this.state.submittedMessage){
        //     const channel = {
        //         name: this.state.channelName, 
        //         description: this.state.channelDescription
        //     } 
        // this.props.createChannel(channel)
        // this.state.submittedMessage = false; 
        
        // if (this.props.memberIds.length > 1) this.setState({channelMembers: true}) 
        // }
        // console.log(this.state)
    }

    // componentDidUpdate(prevProps){
    //     console.log(Object.values(prevProps.channels)[Object.values(prevProps.channels).length - 1].id)
    //         this.state.memberIds.forEach((id, idx) => {
    //         console.log(this.props.dynamicView)
    //         let channelMember = {
    //             channelId: this.props.dynamicView.channelId,
    //             channelMemberId: id,
    //             creator: false 
    //         }
    //         if (id === this.props.currentUser) {channelMember.creator = true}
    //         this.props.createChannelMember(channelMember)
    //         this.state = {
    //             channelName: "",
    //             channelDescription: "",
    //             memberIds: [],
    //             showUsers: false
    //         }
    //     })
    // }

    

    

    update(field) {
        console.log(field)
        return e =>
          this.setState({ [field]: e.currentTarget.value });
    }

    // showUsers(){
    //     var peopleDiv = this.clickAddPeople.current
    //     console.log(peopleDiv.style)
    //     if (peopleDiv.style.display === "none") {
    //         console.log("working")
    //         peopleDiv.style.display = "block";
    //         this.setState({showUsers: true})
    //     } 

    // }

    addPerson(user){
        this.props.memberIds.push(user.id)
   
    }

    modalDisappears(){
        this.modalDisappear.current.style.display = "none"; 
    }

    handleDateChange = (newDate) => {
        this.setState({['date']: newDate})
    }

    render() {
        return (
            <form className="new-channel-form" onSubmit={this.handleSubmit.bind(this)} >
                <h2>Create an event</h2>
                <p>Examples include book clubs, knitting, folfing, movie nights, etc </p>
                
                <div className="all-input-tags">
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
                    new Date(parseInt(this.state.date.slice(6,10)), 
                    parseInt(this.state.date.slice(3,5)), 
                    parseInt(this.state.date.slice(0,2)),
                    parseInt(this.state.timestamp)
                    )
                }

                

               
                <div className="add-people-box">
                <label>Add people</label>
                    <div className="all-users">
                        <ul>
                        {Object.values(this.props.users).map((user) => 
                    
                            <li tabindex={`${user.id}`} className="li-tag" ref={this.clickAddPeople} onClick={this.addPerson.bind(this, user)}>{user.displayName}</li>)
                        }
                        </ul>
                    </div>
                </div>
                </div>
                
                
                    {/* <div className="all-users" ref={this.clickAddPeople}>
                        {this.state.showUsers ? Object.values(this.props.users).map((user) => (
                            
                        )) : ""} */}
                    {/* </div> */}
                    {/* <input type="text" className="new-channel-members" ref={this.inputField} onChange={this.showUsers.bind(this)}  /> */}
                    {/* value ={this.state.memberIds.map(id => this.props.users[id].displayName)} */}
                    
                            
                {/* <input className="create" type="submit" /> */}
                <div className="modal-disappear" onClick={this.modalDisappears.bind(this)} >X</div>
                <button className="create" type="submit" >Create</button>

            </form>
        )
    }
}

export default EventForm