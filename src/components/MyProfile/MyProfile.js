import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Jumbotron, Form, Row, Col } from "react-bootstrap";
import CustomerProfile from "./CustomerProfile";
import SellerProfile from "./SellerProfile";
import Sidebar from "../SidebarProfile/Sidebar";
import "./style.css";

const MyProfile = () => {
  const level = useSelector((state) => state.auth.data.level);
  console.log("ini level", level);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="container-selling ">
        <Jumbotron className="content ">
          <div className="row">
            <div className="col-md-8">
              {level === 2 ? <SellerProfile /> : <CustomerProfile />}
            </div>
            <div className="col-md-4 border-left" style={{marginTop: '100px'}}>
              <div className="d-flex justify-content-center" style={{marginTop: '30px'}}>
                <div className="dp-profil">
                  <img className="img-profil" alt="" />
                </div>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <div className="btn-signup-nav">Select Image</div>
              </div>
            </div>
          </div>
        </Jumbotron>
      </div>
    </div>
  );
};

export default MyProfile;
