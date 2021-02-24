// import React, { useState } from "react";
// import { Formik } from "formik";
// import * as yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { authRegisterCreator } from "../../../redux/actions/auth";
// import { Logo } from "../../../assets/style/index";
// import "./register.css";

// const Register = ({ changeToLogin }) => {
//   const dispatch = useDispatch();
//   const auth = useSelector((state) => state.auth);

//   const [role, setRole] = useState(2);

//   let reviewSchema = "";
//   if (role === 1) {
//     reviewSchema = yup.object({
//       username: yup.string().required(),
//       email: yup.string().required().email(),
//       phone_number: yup.number().required(),
//       store_name: yup.string().required(),
//       password: yup
//         .string()
//         .required()
//         .matches(
//           /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/,
//           "password must be include lowerCase, upperCase, numbers and minimum 8 characters"
//         ),
//     });
//   } else {
//     reviewSchema = yup.object({
//       username: yup.string().required(),
//       email: yup.string().required().email(),
//       password: yup
//         .string()
//         .required()
//         .matches(
//           /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/,
//           "password must be include lowerCase, upperCase, numbers and minimum 8 characters"
//         ),
//     });
//   }

//   let styleBtnCustomer = "btn-custommer";
//   if (role === 2) {
//     styleBtnCustomer = "btn-custommer-active";
//   } else {
//     styleBtnCustomer = "btn-custommer";
//   }

//   let styleBtnSeller = "btn-seller";
//   if (role === 1) {
//     styleBtnSeller = "btn-seller-active";
//   } else {
//     styleBtnSeller = "btn-seller";
//   }

//   return (
//     <div className="d-flex justify-content-center align-items-center container-auth">
//       <form id="create-course-form">
//         <div className="row content-register">
//           <div className="col-md-12 d-flex justify-content-center align-items-center">
//             <img src={Logo} alt="logo" width="120" height="50" />
//           </div>
//           <div className="col-md-12 text-center mt-3">
//             <p className="font-weight-bold">Please sign up with your account</p>
//           </div>
//           <div className="col-md-12 d-flex justify-content-center align-items-center mt-3">
//             <button
//               type="button"
//               className={styleBtnCustomer}
//               onClick={() => {
//                 setRole(2);
//               }}
//             >
//               Custommer
//             </button>
//             <button
//               type="button"
//               className={styleBtnSeller}
//               onClick={() => {
//                 setRole(1);
//               }}
//             >
//               Seller
//             </button>
//           </div>

//           <Formik
//             initialValues={{
//               username: "",
//               email: "",
//               password: "",
//               phone_number: "",
//               store_name: "",
//             }}
//             validationSchema={reviewSchema}
//             onSubmit={(values, { resetForm }) => {
//               if (role === 1) {
//                 const data = {
//                   ...values,
//                   level_id: role,
//                 };
//                 dispatch(authRegisterCreator(data));
//                 resetForm({ values: "" });
//               } else {
//                 const data = {
//                   username: values.username,
//                   email: values.email,
//                   password: values.password,
//                   level_id: role,
//                 };
//                 console.log(data);
//                 dispatch(authRegisterCreator(data));
//                 resetForm({ values: "" });
//               }
//             }}
//           >
//             {(props) => (
//               <>
//                 <div className="col-md-12 d-flex justify-content-center align-items-center mt-3">
//                   <input
//                     type="text"
//                     className="input-text username"
//                     placeholder="Name"
//                     name="username"
//                     onChange={props.handleChange}
//                     onBlur={props.handleBlur}
//                     value={props.values.username}
//                   />
//                 </div>
//                 <div className="col-md-12 d-flex justify-content-center align-items-center">
//                   <p className="text-red">
//                     {props.touched.username && props.errors.username}
//                   </p>
//                 </div>
//                 <div className="col-md-12 d-flex justify-content-center align-items-center mt-2">
//                   <input
//                     type="text"
//                     className="input-text"
//                     placeholder="Email"
//                     name="email"
//                     onChange={props.handleChange}
//                     onBlur={props.handleBlur}
//                     value={props.values.email}
//                   />
//                 </div>
//                 <div className="col-md-12 d-flex justify-content-center align-items-center">
//                   <p className="text-red">
//                     {props.touched.email && props.errors.email}
//                   </p>
//                 </div>
//                 {role === 1 ? (
//                   <>
//                     <div className="col-md-12 d-flex justify-content-center align-items-center mt-2">
//                       <input
//                         type="text"
//                         className="input-text"
//                         placeholder="Phone Number"
//                         name="phone_number"
//                         onChange={props.handleChange}
//                         onBlur={props.handleBlur}
//                         value={props.values.phone_number}
//                       />
//                     </div>
//                     <div className="col-md-12 d-flex justify-content-center align-items-center">
//                       <p className="text-red">
//                         {props.touched.phone_number &&
//                           props.errors.phone_number}
//                       </p>
//                     </div>
//                     <div className="col-md-12 d-flex justify-content-center align-items-center mt-2">
//                       <input
//                         type="text"
//                         className="input-text"
//                         placeholder="Store Name"
//                         name="store_name"
//                         onChange={props.handleChange}
//                         onBlur={props.handleBlur}
//                         value={props.values.store_name}
//                       />
//                     </div>
//                     <div className="col-md-12 d-flex justify-content-center align-items-center">
//                       <p className="text-red">
//                         {props.touched.store_name && props.errors.store_name}
//                       </p>
//                     </div>
//                   </>
//                 ) : null}
//                 <div className="col-md-12 d-flex justify-content-center align-items-center mt-2">
//                   <input
//                     type="password"
//                     className="input-text"
//                     placeholder="Password"
//                     name="password"
//                     onChange={props.handleChange}
//                     onBlur={props.handleBlur}
//                     value={props.values.password}
//                   />{" "}
//                   <br />
//                 </div>
//                 <div className="col-md-12 d-flex justify-content-center align-items-center">
//                   <p className="text-red">
//                     {props.touched.password && props.errors.password}
//                   </p>
//                 </div>
//                 <div className="col-md-12 d-flex justify-content-center align-items-center mt-3">
//                   <button
//                     type="button"
//                     className="btn-submit"
//                     onClick={props.handleSubmit}
//                   >
//                     Register
//                   </button>
//                 </div>
//               </>
//             )}
//           </Formik>
//           <div className="col-md-12 d-flex justify-content-center align-items-center mt-3">
//             <p>
//               Already have a Blanja account?{" "}
//               <span className="text-red" onClick={changeToLogin}>
//                 Login
//               </span>
//             </p>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Register;
// export default class register extends Component {
//     render() {
//         return (
//             <>
//                 <section className="home-page">
//                 <div id="logo">
//                         <div className="logo-shop">
//                             <img src={Logo} alt="logo-shop"/>
//                         </div>
//                         <div className="logo-text">
//                             <p className="tag-logo">Blanja</p>
//                         </div>
//                     </div>
//                     <h4 className="tag-h4">Please sign up with your account</h4>
//                     <div className="button">
//                         <div className="customer-seller">
//                             <button className="customer">
//                             Customer
//                             </button>
//                             <button className="seller">
//                             Seller
//                             </button>
//                         </div>
//                     </div>
//                     <form action="" className="tag-form">
//                         <input type="text"  name="name" id="name" placeholder="Name"/>
//                         <br/>
//                         <input type="email" name="email" id="email" placeholder="Email"/>
//                         <br/>
//                         <input type="text" name="phone-number" id="phone-number" placeholder="Phone number"/>
//                         <br/>
//                         <input type="text" name="store-name" id="store-name" placeholder="Store name"/>
//                         <br/>
//                         <input type="password" name="password" id="password" placeholder="Password"/>
//                     </form>
//                     <div className="forgot-password">
//                         <a href="reset-password" style={{textDecoration:'none'}}>Forgot password?</a>
//                     </div>
//                     <div className="button-primary" >
//                         <button type="button" className="btn-primary" style={{backgroundColor: 'rgba(219, 48, 34, 1)', border: '2px solid rgba(219, 48, 34, 1)'}}><a href="/" style={{textDecoration:'none'}}>Primary</a></button>
//                     </div>
//                     <p className="text-register">Already have a Tokopedia account? <a href="login" style={{textDecoration:'none'}}>Login</a></p>
//                 </section>
//             </>
//         )
//     }
// }
