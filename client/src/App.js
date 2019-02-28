import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";
import Footer from "./components/Layout/Footer";

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Landing />
        <Footer />
      </>
    );
  }
}

export default App;
