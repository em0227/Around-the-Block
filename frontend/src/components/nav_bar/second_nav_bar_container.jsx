import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateCurrentUser } from "../../actions/users_actions";
import SecondNavBar from "./second_nav_bar";

const mapStateToProps = (state) => ({
  currentUser: state.session.user,
});

const mapDispatchToProps = () => (dispatch) => ({
    updateCurrentUser: (userData) => dispatch(updateCurrentUser(userData))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SecondNavBar));
