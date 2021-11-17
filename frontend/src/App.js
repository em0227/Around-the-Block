import React from "react";
import { AuthRoute } from "./util/route_util";
import { Switch } from "react-router";
import MainPage from "./components/main/main_page";
import NavBarContainer from "./components/nav_bar/nav_bar_container";
import LoginFormContainer from "./components/session/login_form_container";
import SignupFormContainer from "./components/session/signup_form_container";
import "antd/dist/antd.css";
import "./assets/stylesheets/application.scss"

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
    </Switch>
  </div>
);

export default App;
