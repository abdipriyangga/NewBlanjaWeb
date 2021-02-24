import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Carousell from "../components/Home/Carousell";
import Category from "../components/Home/Category";
import NewData from "../components/Home/New";
import Popular from "../components/Home/Popular";

export default class Home extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Carousell />
        <Category />
        <NewData />
        <Popular />
      </>
    );
  }
}
