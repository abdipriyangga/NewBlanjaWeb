import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { authLoginCreator } from "../../../redux/actions/auth";
import { Logo } from "../../../assets/style/index";
import "./login2.css";

const Login = ({ changeToRegister, changeToReset }) => {
  const dispatch = useDispatch();
  const msgInvalid = useSelector((state) => state.auth.msgInvalid);


  const [role, setRole] = useState(1);

  let styleBtnCustomer = "btn-custommer";
  if (role === 1) {
    styleBtnCustomer = "btn-custommer-active";
  } else {
    styleBtnCustomer = "btn-custommer";
  }

  let styleBtnSeller = "btn-seller";
  if (role === 2) {
    styleBtnSeller = "btn-seller-active";
  } else {
    styleBtnSeller = "btn-seller";
  }

  const reviewSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
    
  });

  

  return (
    <div className="d-flex justify-content-center align-items-center container-auth">
      <div className="content">
        <div id="logo" style={{justifyContent: 'center'}}>
          <div className="logo-shop">
            <img src={Logo} alt="logo-shop" />
          </div>
          <div className="logo-text">
            <p className="tag-logo">Blanja</p>
          </div>
        </div>
        <div className="col-md-12 text-center mt-3">
          <p className="font-weight-bold">Please login with your account</p>
        </div>
        <div className="col-md-12 d-flex justify-content-center align-items-center mt-3">
          <button
            type="button"
            className={styleBtnCustomer}
            onClick={() => setRole(1)}
          >
            Customer
          </button>
          <button
            type="button"
            className={styleBtnSeller}
            onClick={() => setRole(2)}
          >
            Seller
          </button>
        </div>
        {msgInvalid.length ? (
          <div className="col-md-12 d-flex justify-content-center align-items-center mt-4">
            <p className="text-red">Wrong email or password</p>
          </div>
        ) : null}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={reviewSchema}
          onSubmit={(values, { resetForm }) => {
            dispatch(authLoginCreator(values.email, values.password));
            resetForm({ values: "" });
          }}
        >
          {(props) => (
            <>
              <div className="col-md-12 d-flex justify-content-center align-items-center mt-4">
                <input
                  type="text"
                  className="input-text"
                  placeholder="Email"
                  name="email"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.email}
                />{" "}
                <br />
              </div>
              <div className="col-md-12 d-flex justify-content-center align-items-center">
                <p className="text-red">
                  {props.touched.email && props.errors.email}
                </p>
              </div>
              <div className="col-md-12 d-flex justify-content-center align-items-center mt-3">
                <input
                  type="password"
                  className="input-text"
                  placeholder="Password"
                  name="password"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.password}
                />
                <br />
              </div>
              <div className="col-md-12 d-flex justify-content-center align-items-center">
                <p className="text-red">
                  {props.touched.password && props.errors.password}
                </p>
              </div>
              <div className="col-md-12 d-flex justify-content-center align-items-center mt-2">
                <p className="text-forgot-password" onClick={changeToReset}>Forgot password?</p>
              </div>
              <div className="col-md-12 d-flex justify-content-center align-items-center mt-3">
                <button
                  type="button"
                  className="btn-submit"
                  onClick={props.handleSubmit}
                >
                  Login
                </button>
              </div>
            </>
          )}
        </Formik>
        <div className="col-md-12 d-flex justify-content-center align-items-center mt-3">
          <p>
            Don't have a Blanja account?{" "}
            <span className="text-red" onClick={changeToRegister}>
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;