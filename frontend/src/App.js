import React from "react";
import { Route } from "react-router-dom";
import { AuthRoute } from "./util/route_util";
import { Switch } from "react-router";
// import MainPage from "./components/main/main_page";
import NavBarContainer from "./components/nav_bar/nav_bar_container";
import LoginFormContainer from "./components/session/login_form_container";
import SignupFormContainer from "./components/session/signup_form_container";
import "antd/dist/antd.css";
import "./assets/stylesheets/application.scss";
// import EventContainer from "./components/event/event_show_container";
import EventShow from "./components/event/event_show";
// import Mic from './components/voice/mic';
import MainPageContainer from "./components/main/main_page_container";
import UserProfileContainer from "./components/profile/user_profile_container"
import CreateEventContainer from "./components/profile/create_event"

const App = () => (
  <div>
    <header>
    <Route path="/" component={NavBarContainer} />
   </header>
    <Switch>
      <AuthRoute exact path="/" component={MainPageContainer} />
      <Route exact path="/events" component={MainPageContainer} />
      <Route exact path="/events/create" component={CreateEventContainer} />
      <Route exact path="/profile" component={UserProfileContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      {/* <AuthRoute exact path="/voice" component={Mic} /> */}
      <AuthRoute exact path="/event" component={EventShow} />
    </Switch>
  </div>
);

export default App;
