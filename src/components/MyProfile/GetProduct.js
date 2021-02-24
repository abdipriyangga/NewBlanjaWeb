import React, { useState, useEffect } from "react";
import { Card, Jumbotron } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import Rating from "../Rating/Rating";
import axios from "axios";
import Sidebar from "../SidebarProfile/Sidebar";
import Navbar from "../Navbar";
import { Bounce, toast } from "react-toastify";
import Loader from "../LoaderTwo/Loader";
import { Redirect } from 'react-router-dom';
const getUrl = process.env.REACT_APP_URL;

toast.configure();
const GetProduct = (props) => {
  const [addP, setAddP] = useState(false)
  const [products, setProducts] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [show, setShow] = useState(false);
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = useSelector((state) => state.auth.data.token);
  const getProducts = async () => {
    await axios
      .get(`${getUrl}/products/user?keyword=created_at DESC`, {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then(({ data }) => {
        const products = data.data;
        history.push({
          products,
        });
        console.log("products", products);
        setProducts(products);
        // setImg(images);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const {id} = props.location.products

  const handleDelete = (id) => {
    axios
      .delete(getUrl + `/products/${id}`, {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then((res) => {
        toast.success("Product deleted successfull!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          transition: Bounce,
        });
        getProducts();
      })
      .catch((err) => {
        console.log("error disokin", err.response);
      });
  };

  useEffect(() => {
    getProducts(products);
  }, [])

  useEffect(() => {
    setTimeout(() => setSpinner(false),2000);
    getProducts();
  }, []);

  if (spinner === true) {
    getProducts(products);
    return <Loader />;
  }

  if (addP === true) {
    return <Redirect to="/profile" />
  }
  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="container-selling" style={{ height: "100%" }}>
          <Jumbotron className="container-content" style={{ height: "100%" }}>
            <h3>Your Product</h3>
            <hr></hr>
            {products.length === 0 ? (
              <p>Your product empty</p>
            ) : (
              <div className="container">
                <div className="row d-flex flex-row justify-content-arround">
                  {products.map(
                    ({
                      id,
                      product_name,
                      product_photo,
                      category_name,
                      product_price,
                      product_qty,
                      product_desc,
                      sizes,
                      colors,
                      rating,
                    }) => {
                      return (
                        <Card
                          className="card-style"
                          style={{ width: "18rem", marginRight: "12px" }}
                          key={id}
                        >
                          <Link
                            to={{
                              pathname: `/products/${id}`,
                              products,
                            }}
                          >
                            <img
                              src={getUrl + JSON.parse(product_photo).shift()}
                              className="card-img-top"
                              alt="..."
                              style={{ height: "15rem" }}
                            />
                          </Link>
                          <div className="card-body">
                            <h5 className="card-title">{product_name}</h5>
                            <p className="card-text">Rp. {product_price}</p>
                            <p className="card-text2">{category_name}</p>
                            <Rating product_rating={rating} />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginBottom: "20px",
                              marginTop: "20px",
                              justifyContent: "space-around",
                            }}
                          >
                            <Link
                              to={{
                                pathname: `/edit/${id}`,
                                id,
                                product_name,
                                product_desc,
                                category_name,
                                product_price,
                                product_qty,
                                product_photo,
                                sizes,
                                colors,
                              }}
                            >
                              <button className="editProd" style={{}}>
                                <div className="btn-login-nav ">Edit</div>
                              </button>
                            </Link>
                            <button
                              className="deleteProd"
                              onClick={() => {
                                handleDelete(id);
                              }}
                            >
                              <div className="btn-login-nav ">Delete</div>
                            </button>
                          </div>
                        </Card>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </Jumbotron>
        </div>
      </div>

      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton style={{ border: "none" }}>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h6
              style={{
                fontSize: "15px",
                marginBottom: "15px",
                paddingRight: "15px",
                paddingLeft: "15px",
                textAlign: "center",
              }}
            >
              {`Are you sure want to delete ?`}
            </h6>
            <div
              className="login d-flex"
              style={{
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <button onClick={handleClose} className="btn-no">
                No
              </button>
              {/* <button
                onClick={(id) => {
                  handleDelete(id);
                }}
                style={{ marginTop: "20px" }}
                className="btn-login"
              >
                Yes
              </button> */}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GetProduct;
