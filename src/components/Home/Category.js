import React, { useState, useEffect } from "react";
// import { TShirt, Shorts, Jacket, Pants, Shoes } from "../../assets/style";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
// import '../../assets/style/category.css'

const Category = () => {
  const [category, setCategory] = useState([]);

  const getAllCategory = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/categories/?keyword=created_at DESC`)
      .then((res) => {
        const categories = res.data.data;
        setCategory(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  if (!category.length) {
    return <Loader />;
  }
  return (
    <div>
      <div className="container">
        <div className="title-category">
          <h3>Category</h3>
          <p className="lead text-muted">What are you currently looking for</p>
          <div
            className="row d-flex justify-content-lg-around justify-content-md-start"
            style={{ borderRadius: "10px" }}
          >
            {category.map(
              ({
                id_categories,
                category_name,
                category_photo,
                color_hexa,
              }) => {
                return (
                  <>
                    <div
                      className="col-md-auto rounded box justify-content-center brand-category-2 mb-5"
                      style={{ backgroundColor: color_hexa, margin: "5px" }}
                      key={id_categories}
                    >
                      <Link
                        to={{
                          pathname: `/category/${id_categories}`,
                          search: `keyword=${category_name}`,
                          category,
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        <img
                          src={category_photo}
                          alt=""
                          className="fluid mx-auto d-block"
                        />
                        <h3>{category_name}</h3>
                      </Link>
                    </div>
                  </>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
