import { connect } from "react-redux";
import { fetchUser} from "../../actions/user_actions";
import FutureEvent from "./future_event";

const mapStateToProps = (state, ownProps) => ({
  user: state.session.user
  
  // user: Object.values(state.users).filter(
  //   (user) => user._id === ownProps.match.params.userId
  // )[0],
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (userId) => dispatch(fetchUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FutureEvent);
