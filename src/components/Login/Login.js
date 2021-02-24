import React, { useState } from "react";
// import { Button } from 'react-bootstrap'
import { Logo } from "../../assets/style/index";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { authLoginCreator } from "../../redux/actions/auth";
import "../../assets/style/login.css";

const Login = ({ changeToRegister, changeToReset }) => {
  const dispatch = useDispatch();
  const msgInvalid = useSelector((state) => state.auth.msgInvalid);
  // console.log("pesan : ", msgInvalid);

  const [role, setRole] = useState(2);

  let styleBtnCustomer = "btn-custommer";
  if (role === 2) {
    styleBtnCustomer = "btn-custommer-active";
  } else {
    styleBtnCustomer = "btn-custommer";
  }

  let styleBtnSeller = "btn-seller";
  if (role === 1) {
    styleBtnSeller = "btn-seller-active";
  } else {
    styleBtnSeller = "btn-seller";
  }

  const reviewSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });
  return (
    <>
      <section className="home-page">
        <div id="logo">
          <div className="logo-shop">
            <img src={Logo} alt="logo-shop" />
          </div>
          <div className="logo-text">
            <p className="tag-logo">Blanja</p>
          </div>
        </div>
        <h4 className="tag-h4">Please login with your account</h4>
        <div className="col-md-12 d-flex justify-content-center align-items-center mt-3">
          <button
            type="button"
            className={styleBtnCustomer}
            onClick={() => setRole(2)}
          >
            Customer
          </button>
          <button
            type="button"
            className={styleBtnSeller}
            onClick={() => setRole(1)}
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
              <form action="" className="tag-form">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.email}
                />
                <p className="text-red">
                  {props.touched.email && props.errors.email}
                </p>
                <br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.password}
                />
                <p className="text-red">
                  {props.touched.password && props.errors.password}
                </p>
              </form>
              <div className="forgot-password">
                <p className="text-forgot-password" onClick={changeToReset}>
                  Forgot password?
                </p>
              </div>
              <div className="button-primary">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={props.handleSubmit}
                  style={{
                    backgroundColor: "rgba(219, 48, 34, 1)",
                    border: "2px solid rgba(219, 48, 34, 1)",
                  }}
                >
                  Primary
                </button>
              </div>
            </>
          )}
        </Formik>
        <p className="text-register">
          Don't have a Tokopedia account?{" "}
          <span className="text-red" onClick={changeToRegister}>
            Register
          </span>
        </p>
      </section>
    </>
  );
};

export default Login;
