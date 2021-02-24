import React, { useState } from "react";
import { Logo } from "../../assets/style/index";
import { useSelector } from "react-redux";
// import { Formik } from "formik";
// import * as yup from "yup";
import axios from "axios";
import { Redirect } from "react-router-dom";
// import { Link } from "react-router-dom";
import { API } from "../../utility/Auth";
import "../../assets/style/login.css";

const ChangePassword = () => {
  const [isConfrim, setIsConfrim] = useState(false);
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [pass3, setPass3] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [errMsg2, setErrMsg2] = useState("");
  const token = useSelector((state) => state.auth.data.token);
  console.log("ini token", token);
  const email = useSelector((state) => state.auth.data.email);
  console.log("ini email", email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pass2 != pass3) {
      setErrMsg("password doesnt match");
    } else {
      const checkPass = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/;
      if (checkPass.test(pass2)) {
        setErrMsg2(
          "Password must contain at least 1 number, and be longer than 8 character"
        );
      }
      const updatePassword = {
        old_password: pass,
        new_password: pass2,
        confirm_new_password: pass3,
      };

      await axios
        .put(API + `/auth/profile`, updatePassword, {
          headers: {
            "x-access-token": "Bearer " + token,
          },
        })
        .then(({ data }) => {
          console.log("update password done", data);
          setIsConfrim(true);
        })
        .catch((err) => {
          console.log("eror password", err.response);
        });
    }
  };

  if (isConfrim === true) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center container-auth">
      <div className="content">
        <div id="logo" style={{ justifyContent: "center" }}>
          <div className="logo-shop">
            <img src={Logo} alt="logo-shop" />
          </div>
          <div className="logo-text">
            <p className="tag-logo">Blanja</p>
          </div>
        </div>
        <div className="col-md-12 text-center mt-3">
          <h4 className="tag-h4">Change Password</h4>
          <h5 className="tag-h5">
            You need to change your password to active your account
          </h5>
          {errMsg === null ? null : <p style={{ color: "red" }}>{errMsg}</p>}
        </div>
        <div className="col-md-12 d-flex justify-content-center align-items-center mt-4">
          <input
            type="password"
            className="input-text"
            placeholder="Old Password"
            name="Old Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <div className="col-md-12 d-flex justify-content-center align-items-center mt-4">
          <input
            type="password"
            className="input-text"
            placeholder="New Password"
            name="New Password"
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
          />
        </div>
        <div className="col-md-12 d-flex justify-content-center align-items-center mt-4">
          <input
            type="password"
            className="input-text"
            placeholder="Confrim New Password"
            name="Confrim New Password"
            value={pass3}
            onChange={(e) => setPass3(e.target.value)}
          />
        </div>
        <div className="col-md-12 d-flex justify-content-center align-items-center mt-5">
          <button type="button" className="btn-submit" onClick={handleSubmit}>
            Confrim
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
