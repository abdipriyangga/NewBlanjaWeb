// import React, { useState,useEffect } from "react";
// import { Card } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { Jas } from "../../assets/style";
// import Rating from "../Rating/Rating";
// import Navbar from '../Navbar'
// import axios from "axios";
// // const getUrl = "http://19/search";

// const ProductCategory = () => {
//   const [categories, setCategories] = useState([])

//   getAllProducts = () => {
//     // const categorySort = this.props.ctg;
//     // const ctgId = this.props.categoryId;
//     axios
//       .get(`${process.env.REACT_APP_URL}/${props.match.params.id_category}?keyword=created_at DESC`)
//       .then(({ data }) => {
//         const category = data.data.products
//         setCategories(category)
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     getAllProducts()
//   }, [])


//     return (
//       <>
//       <Navbar />
//         <div className="container">
//           <div className="row d-flex flex-row justify-content-center">
//             {categories.map(
//               ({
//                 id,
//                 product_name,
//                 product_photo,
//                 category_name,
//                 product_price,
//                 rating,
//               }) => {
//                 return (
//                   <Card
//                     className="card-style"
//                     style={{ width: "18rem" }}
//                     key={id}
//                   >
//                     <Link
//                       to={{
//                         pathname: `/product/${id}`,
//                         state: this.state,
//                       }}
//                     >
//                       <img src={JSON.parse(product_photo).shift()} className="card-img-top" alt="..." />
//                     </Link>
//                     <div className="card-body">
//                       <h5 className="card-title">{product_name}</h5>
//                       <p className="card-text">{product_price}</p>
//                       <p className="card-text2">{category_name}</p>
//                       <Rating product_rating={rating} />
//                     </div>
//                   </Card>
//                 );
//               }
//             )}
//           </div>
//         </div>
//       </>
//     );
  
// }

// export default ProductCategory;
