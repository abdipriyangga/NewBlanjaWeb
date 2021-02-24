import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
// import Sidebar from "../SidebarProfile/Sidebar";
import "./style.css";

const SellerProfile = () => {
    const full_name = useSelector((state) => state.auth.data.full_name);
    const email = useSelector((state) => state.auth.data.email)
  //   const level = useSelector((state) => state.auth.data.level);
  //   console.log("ini level", level);

  return (
    <>
      <div className="test">
        <h3>My profile store</h3>
        <p className="font-p-title">Manage your profile information</p>
        <hr></hr>

        <Form style={{ padding: "0" }}>
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={3}>
              Store Name
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" placeholder={full_name} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={3}>
              Email
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="email" placeholder={email} />
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
            <Form.Label column sm={3} className="mt-n1">
              Store description
            </Form.Label>
            <Col sm={9}>
              <textarea></textarea>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={3} className="mt-n5"></Form.Label>
            <Col sm={9}>
              <button className="save">
                <div className="btn-login-nav ">Save</div>
              </button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default SellerProfile;
