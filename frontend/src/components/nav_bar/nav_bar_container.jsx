import React from 'react';
import {connect} from 'react-redux';
import NavBar from './nav_bar';
import { logout } from '../../actions/session';

const mapStateToProps = (state) => ({
  loggedIn: state.session.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);