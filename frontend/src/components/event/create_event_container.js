import {createEvent} from '../../actions/event_actions'
import {eventForm} from "../event/event_form"

const mapStateToProps = (state) => ({
    event: {
        name: "",
        lat: "",
        long: "",
        imageUrl: "",
        description: "",
        timestamp: "",
        date: new Date(),
        time
    },
    
    formType: "Create Event",

})

const mapDispatchToProps = (dispatch) => ({
    processForm: (event) => dispatch(createEvent(event)),
    
})

export default connect(mapStateToProps, mapDispatchToProps)(EventForm)