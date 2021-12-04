import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import { withRouter } from "react-router-dom";
import { updateFriend } from "../../actions/friend_request_actions";

import NavBar from "./nav_bar";

const mapStateToProps = (state) => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session,
});

const mapDispatchToProps = () => (dispatch) => ({
  logout: () => dispatch(logout()),
  updateFriend: (request) => dispatch(updateFriend(request)),

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
