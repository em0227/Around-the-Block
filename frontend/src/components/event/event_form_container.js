

const mapStateToProps = (state) => ({
    user: {
        email: "",
        password: "",
        displayName: "",
        imageUrl: "test"
    },
    formType: "Create Event",

})

const mapDispatchToProps = (dispatch) => ({
    createEvent: (event) => dispatch(createEvent(event))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventForm)