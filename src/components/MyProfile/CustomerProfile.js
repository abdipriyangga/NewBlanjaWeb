import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { API } from "../../utility/Auth";
import axios from "axios";
// import Sidebar from "../SidebarProfile/Sidebar";
import "./style.css";

const CustomerProfile = () => {
  const full_name = useSelector((state) => state.auth.data.full_name);
  const email = useSelector((state) => state.auth.data.email);
  const token = useSelector((state) => state.auth.data.token);
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateProfile = {
      full_name: name,
      email: mail,
    };

    await axios
      .put(API + `/auth/profile`, updateProfile, {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then(({ data }) => {
        console.log("update profile", data);
      })
      .catch((err) => {
        console.log("error update profile", err.response);
      });
  };
  // console.log("ini fullname dari profile", full_name)
  // console.log("ini email dari profile", email)
  return (
    <>
      <div className="test">
        <h3>My profile</h3>
        <p className="font-p-title">Manage your profile information</p>
        <hr></hr>

        <Form style={{ padding: "0" }}>
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={3}>
              Name
            </Form.Label>
            <Col>
              <Form.Control
                type="text"
                placeholder={full_name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={3}>
              Email
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="email"
                placeholder={email}
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={3}>
              Phone Number
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" placeholder="08xxxxx" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={3} className="mt-n5"></Form.Label>
            <Col sm={9}>
              <button className="save" onClick={handleSubmit}>
                <div className="btn-login-nav ">Save</div>
              </button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default CustomerProfile;
