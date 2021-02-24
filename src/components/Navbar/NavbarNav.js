import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";

import "./style.css";

export default class NavbarNav extends Component {
  render() {
    return (
      <>
        <header className="header">
          <Navbar className="container" fixed="top" bg="white">
            <div className="brand d-lg-none">
              <Navbar.Brand href="#home">
                <img
                  src="https://res.cloudinary.com/devloops7/image/upload/v1606499947/newBlanja/VectorlogoKecil_ijoj9p.png"
                  width="30"
                  height="44"
                  className="d-inline-block align-top nav-logo"
                  alt="React Bootstrap logo"
                />
              </Navbar.Brand>
            </div>
            <div className="brand2">
              <Navbar.Brand href="#home">
                <img
                  src="https://res.cloudinary.com/devloops7/image/upload/v1606499947/newBlanja/VectorlogoBesar_vobugk.png"
                  width="30"
                  height="44"
                  className="d-inline-block align-top nav-logo"
                  alt="React Bootstrap logo"
                />
                <Navbar.Text className="textNavbar ">Blanja</Navbar.Text>
              </Navbar.Brand>
            </div>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <FontAwesomeIcon
                style={{ margin: "0 20px", color: "#eaeaea" }}
                icon={faBell}
              />
              <FontAwesomeIcon
                style={{ margin: "0 20px", color: "#eaeaea" }}
                icon={faEnvelope}
              />
              <div className="dp-profil-nav">
                <img className="img-profil-nav" alt="" />
              </div>
            </Navbar.Collapse>
          </Navbar>
        </header>
      </>
    );
  }
}
