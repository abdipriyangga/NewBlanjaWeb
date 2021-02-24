import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { authRegisterCreator } from "../../redux/actions/auth";
import { Logo } from "../../assets/style/index";
import { useHistory } from "react-router-dom";
import "../../assets/style/login.css";

const Register = ({ changeToLogin }) => {
  const dispatch = useDispatch();
  
  
  const history = useHistory();
  const [role, setRole] = useState(1);

  let reviewSchema = "";
  if (role === 2) {
    reviewSchema = yup.object({
      username: yup.string().required(),
      full_name: yup.string().required(),
      email: yup.string().required().email(),
      password: yup
        .string()
        .required()
        .matches(
          /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/,
          "password must be include lowerCase, upperCase, numbers and minimum 8 characters"
        ),
    });
  } else {
    reviewSchema = yup.object({
      username: yup.string().required(),
      full_name: yup.string().required(),
      email: yup.string().required().email(),
      password: yup
        .string()
        .required()
        .matches(
          /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/,
          "password must be include lowerCase, upperCase, numbers and minimum 8 characters"
        ),
    });
  }

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
        <h4 className="tag-h4">Please sign up with your account</h4>
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
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            full_name: "",
          }}
          validationSchema={reviewSchema}
          onSubmit={(values, { resetForm }) => {
            if (role === 2) {
              const data = {
                ...values,
                level_id: role,
              };
              dispatch(authRegisterCreator(data));
              resetForm({ values: "" });
              onclick={changeToLogin}
            } else {
              const data = {
                username: values.username,
                email: values.email,
                password: values.password,
                full_name: values.full_name,
                level_id: role,
              };
              dispatch(authRegisterCreator(data));
              resetForm({ values: "" });
              onclick={changeToLogin}
            }
          }}
        >
          {(props) => (
            <>
              <form
                action=""
                className="tag-form"
                onSubmit={props.handleSubmit}
              >
                <div className="col-md-12 d-flex justify-content-center align-items-center mt-3">
                  <input
                    type="text"
                    className="input-text username"
                    placeholder="Name"
                    name="username"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.username}
                  />
                </div>
                <div className="col-md-12 d-flex justify-content-center align-items-center">
                  <p className="text-red">
                    {props.touched.username && props.errors.username}
                  </p>
                </div>

                <div className="col-md-12 d-flex justify-content-center align-items-center mt-3">
                  {role === 2 ? (
                    <input
                      type="text"
                      className="input-text username"
                      placeholder="Store Name"
                      name="full_name"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.full_name}
                    />
                  ) : (
                    <input
                      type="text"
                      className="input-text username"
                      placeholder="Fullname"
                      name="full_name"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.full_name}
                    />
                  )}
                </div>
                <div className="col-md-12 d-flex justify-content-center align-items-center">
                  <p className="text-red">
                    {props.touched.full_name && props.errors.full_name}
                  </p>
                </div>

                <div className="col-md-12 d-flex justify-content-center align-items-center mt-2">
                  <input
                    type="text"
                    className="input-text"
                    placeholder="Email"
                    name="email"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                  />
                </div>
                <div className="col-md-12 d-flex justify-content-center align-items-center">
                  <p className="text-red">
                    {props.touched.email && props.errors.email}
                  </p>
                </div>
                <div className="col-md-12 d-flex justify-content-center align-items-center mt-2">
                  <input
                    type="password"
                    className="input-text"
                    placeholder="Password"
                    name="password"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                  />{" "}
                  <br />
                </div>
                <div className="col-md-12 d-flex justify-content-center align-items-center">
                  <p className="text-red">
                    {props.touched.password && props.errors.password}
                  </p>
                </div>
              </form>
              <div className="col-md-12 d-flex justify-content-center align-items-center mt-3">
                <button
                  type="button"
                  className="btn-submit"
                  onClick={() => {
                    props.handleSubmit();
                    changeToLogin();
                  }}
                >
                  Register
                </button>
              </div>
            </>
          )}
        </Formik>
        <p className="text-register">
          Already have a Tokopedia account?{" "}
          <span className="text-red" onClick={changeToLogin}>
            Login
          </span>
        </p>
      </section>
    </>
  );
};

export default Register;
