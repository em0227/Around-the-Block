import React from "react";
import { Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./util/route_util";
import { Switch } from "react-router";
import NavBarContainer from "./components/nav_bar/nav_bar_container";
import SecondNavBarContainer from "./components/nav_bar/second_nav_bar_container";
import LoginFormContainer from "./components/session/login_form_container";
import SignupFormContainer from "./components/session/signup_form_container";
import "antd/dist/antd.css";
import "./assets/stylesheets/application.scss";
import EventShowContainer from "./components/event/event_show_container";
import MainPageContainer from "./components/main/main_page_container";
import ProfilePageContainer from "./components/user_profile/profile_page_container";

import Footer from "./components/footer";
import CreateEventContainer from "./components/user_profile/create_event_container";
import UpdateEventContainer from "./components/user_profile/update_event_container";

const App = () => (
  <div>
    <header>
      <Route path="/" component={NavBarContainer} />
      <Route path="/profile" component={SecondNavBarContainer} />
    </header>
    <Switch>
      <Route exact path="/events" component={MainPageContainer} />
      <ProtectedRoute
        exact
        path="/events/create"
        component={CreateEventContainer}
      />
      {/* <Route exact path="/profile" component={UserProfileContainer} /> */}
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/events/update/:eventId" component={UpdateEventContainer} />
      <ProtectedRoute
        exact
        path="/profile"
        component={ProfilePageContainer}
      />
      <Route exact path="/events/:eventId" component={EventShowContainer} />
      <Route exact path="/" component={MainPageContainer} />
    </Switch>
    <Footer className="footer" />
  </div>
);

export default App;
