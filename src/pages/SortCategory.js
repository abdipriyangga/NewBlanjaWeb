import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { Jas } from "../../assets/style";
import Rating from "../components/Rating/Rating";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../utility/Auth";
// const getUrl = "http://19/search";
const getUrl = process.env.REACT_APP_URL;

const SortCategory = (props) => {
  const [categories, setCategories] = useState([]);
  let { id_categories } = useParams();
  const getAllProducts = async () => {
    await axios
      .get(`${getUrl}/categories/${id_categories}?keyword=created_at DESC`)
      .then((res) => {
        const category = res.data.data.product;
        console.log(res.data.data.product);
        setCategories(category);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, [id_categories]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row d-flex flex-row justify-content-start">
          {categories &&
            categories.map(
              ({
                id,
                id_categories,
                product_name,
                product_photo,
                category_name,
                product_price,
                rating,
              }) => {
                return (
                  <Card
                    className="card-style"
                    style={{ width: "18rem" }}
                    key={id_categories}
                  >
                    <Link
                      to={{
                        pathname: `/products/${id}`,
                        categories,
                      }}
                    >
                      <img
                        src={API + JSON.parse(product_photo).shift()}
                        className="card-img-top"
                        alt="..."
                        style={{ height: "15rem" }}
                      />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title">{product_name}</h5>
                      <p className="card-text">{product_price}</p>
                      <p className="card-text2">{category_name}</p>
                      <Rating product_rating={rating} />
                    </div>
                  </Card>
                );
              }
            )}
        </div>
      </div>
    </>
  );
};

export default SortCategory;

// import React, { Component } from 'react'
// import Navbar from '../components/Navbar'
// import ProductCategory from '../components/Home/ProductCategory'

// export default class SortCategory extends Component {
//     render() {
//         const { location } = this.props;
//         return (
//             <div>
//                 <Navbar />
//                 <ProductCategory />
//             </div>
//         )
//     }
// }
