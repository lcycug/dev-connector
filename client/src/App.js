import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

import PrivateRoute from "./components/common/PrivateRoute";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./components/store";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/dashboard/CreateProfile";
import HandleExperience from "./components/dashboard/HandleExperience";

if (localStorage.getItem("jwtToken")) {
  const token = localStorage.getItem("jwtToken");
  // Set axios defaults headers
  setAuthToken(token);
  // Devode token
  const decoded = jwtDecode(token);
  // Log out user if expire time is triggered
  const expireTime = decoded.exp;
  const currentTime = new Date().getTime() / 1000;
  if (expireTime < currentTime) {
    logoutUser();
  } else {
    // Set current user
    store.dispatch(setCurrentUser(decoded));
  }
}

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute
            exact
            path="/dashboard/create-new-profile"
            component={CreateProfile}
          />
          <PrivateRoute
            exact
            path="/dashboard/edit-profile"
            component={CreateProfile}
          />
          <PrivateRoute
            exact
            path="/dashboard/add-experience"
            component={HandleExperience}
          />
          <PrivateRoute
            exact
            path="/dashboard/add-education"
            component={HandleExperience}
          />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default App;
