import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductName from "../components/Product/ProductName";
import { useSelector } from "react-redux";

const getUrl = process.env.REACT_APP_URL;

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [img, setImg] = useState([]);
  const [qty, setQty] = useState(0);
  const [sizes, setSizes] = useState([]);

  const getProduct = async () => {
    await axios
      .get(`${getUrl}/products/` + props.match.params.id)
      .then(({ data }) => {
        const productId = data.data;
        const image = data.data.product_photo;
        const images = JSON.parse(image);
        const jumlah = data.data.product_qty / data.data.product_qty;
        const size = data.data.sizes.map((item) => {
          return item.size;
        });
        setSizes(size);
        setProduct(productId);
        setImg(images);
        setQty(jumlah);
        // console.log("PRODUCT", productId);
        // console.log("IMAGE", images);
        // console.log("sizes", size.length);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  useEffect(() => {
    getProduct(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <>
      <ProductName
        name={product.product_name}
        brand={product.category_name}
        desc={product.product_desc}
        price={product.product_price}
        condition={product.conditions}
        size={sizes}
        color={product.colors}
        qty={qty}
        photo={img}
        rating={product.rating}
        id={product.id}
        seller_id={product.user_id}
      />
    </>
  );
};

export default Product;
