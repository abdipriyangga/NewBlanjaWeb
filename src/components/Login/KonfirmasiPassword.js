import React, { useState } from "react";
import { Logo } from "../../assets/style/index";
import { Formik } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { Redirect } from "react-router-dom";
// import { Link } from "react-router-dom";
import { API } from "../../utility/Auth";
import "../../assets/style/login.css";

const KonfirmasiPassword = ({ changeToRegister }) => {
  const [isConfrim, setIsConfrim] = useState(false);

  const sendOtp = (email, password) => {
    const api = `${API}/auth/reset`;
    Axios.patch(api, { email: email, password: password })
      .then((data) => {
        setIsConfrim(true);
      })
      .catch((err) => console.log(err));
  };

  const reviewSchema = yup.object({
    email: yup.string().required().email(),
    password: yup
      .string()
      .required()
      .matches(
        /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/,
        "password must be include lowerCase, upperCase, numbers and minimum 8 characters"
      ),
  });

  if (isConfrim === true) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center container-auth">
      <form>
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
            <h4 className="tag-h4">Reset Password</h4>
            <h5 className="tag-h5">
              You need to change your password to active your account
            </h5>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={reviewSchema}
            onSubmit={(values, { resetForm }) => {
              sendOtp(values.email, values.password);
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
                  />
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
                <div className="col-md-12 d-flex justify-content-center align-items-center mt-5">
                  <button
                    type="button"
                    className="btn-submit"
                    onClick={props.handleSubmit}
                  >
                    Confrim
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
      </form>
      {/* <Modal show={show} handleShow={handleShow} handleClose={handleClose} /> */}
    </div>
  );
};
export default KonfirmasiPassword;

// export default class ResetPassword extends Component {
//     render() {
//         return (
//             <div>
//                 <section className="home-page">
//                     <div id="logo">
//                         <div className="logo-shop">
//                             <img src={Logo} alt="logo-shop"/>
//                         </div>
//                         <div className="logo-text">
//                             <p className="tag-logo">Blanja</p>
//                         </div>
//                     </div>
//                     <h4 className="tag-h4">Reset Password</h4>
//                     <form action="" className="tag-form">
//                         <input type="email" name="email" id="email" placeholder="Email"/>
//                     </form>
//                     <div className="button-primary">
//                         <button type="button" class="btn-primary" style={{backgroundColor: 'rgba(219, 48, 34, 1)', border: '2px solid rgba(219, 48, 34, 1)'}}><a href="konfirmasi" style={{textDecoration:'none'}}>Primary</a></button>
//                     </div>
//                     <Link to="/register">
//                     <p className="text-register">Don't have a Tokopedia account? Register</p>
//                     </Link>
//                 </section>
//             </div>
//         )
//     }
// }
