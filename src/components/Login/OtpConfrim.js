import React, { useState } from "react";
import { Logo } from "../../assets/style/index";
import { Formik } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { Redirect } from "react-router-dom";
// import { Link } from "react-router-dom";
import { API } from "../../utility/Auth";
import "../../assets/style/login.css";

const OtpConfrim = ({ changeToRegister }) => {
  const [isConfrim, setIsConfrim] = useState(false);

  const sendOtp = (email, otp) => {
    const api = `${API}/auth/findOTP`;
    Axios.post(api, { email: email, otp: otp })
      .then((data) => {
        setIsConfrim(true);
      })
      .catch((err) => console.log(err));
  };

  const reviewSchema = yup.object({
    email: yup.string().required().email(),
    otp: yup.string().required(),
  });

  if (isConfrim === true) {
    return <Redirect to="/confrim" />;
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
            <p className="font-weight-bold">Input your OTP</p>
          </div>
          <Formik
            initialValues={{ email: "", otp: "" }}
            validationSchema={reviewSchema}
            onSubmit={(values, { resetForm }) => {
              sendOtp(values.email, values.otp);
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
                    type="text"
                    className="input-text"
                    placeholder="OTP"
                    name="otp"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.otp}
                  />
                  <br />
                </div>
                <div className="col-md-12 d-flex justify-content-center align-items-center">
                  <p className="text-red">
                    {props.touched.otp && props.errors.otp}
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
export default OtpConfrim;

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
