import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { setCurrentUser } from "./actions/authAction";
import store from "./components/store";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

if (localStorage.getItem("jwtToken")) {
  const token = localStorage.getItem("jwtToken");
  // Set axios defaults headers
  setAuthToken(token);
  // Devode token
  const decoded = jwtDecode(token);
  // Set current user
  store.dispatch(setCurrentUser(decoded));
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
        </Switch>
        <Footer />
      </>
    );
  }
}

export default App;
