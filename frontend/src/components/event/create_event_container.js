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
    currentUser: state.session.user._id,
    formType: "Create An Event",

})

const mapDispatchToProps = (dispatch) => ({
    processForm: (event) => dispatch(createEvent(event)),
    
})

export default connect(mapStateToProps, mapDispatchToProps)(EventForm)