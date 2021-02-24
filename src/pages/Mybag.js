import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, useHistory } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  addToCheckout,
  clearCart,
  clearCheckout,
  deleteCart,
} from "../redux/actions/product";
import { useSelector, useDispatch } from "react-redux";
import "../assets/style/mybag.css";
import emptyCart from "../assets/image/empty-cart.png";
import { Alert, Modal } from "react-bootstrap";
import axios from "axios";
import { API } from "../utility/Auth";

const Mybag2 = () => {
  const [cart, setCart] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    getAddressUser();
  }, []);

  const handleSelectAll = (evt) => {
    if (evt.target.checked) {
      stateCarts.map((item) => (item.selected = true));
      setCart([...cart]);
    } else {
      stateCarts.map((item) => (item.selected = false));
      setCart([...cart]);
    }
  };

  const handleSelectItem = (evt) => {
    if (evt.target.checked) {
      let penampung = stateCarts.filter(
        (item) => item.id === Number(evt.target.id)
      );
      penampung[0].selected = true;
      setCart([...cart]);
    } else {
      let penampung = stateCarts.filter(
        (item) => item.id === Number(evt.target.id)
      );
      penampung[0].selected = false;
      setCart([...cart]);
    }
  };

  const dispatch = useDispatch();
  const stateCarts = useSelector((state) => state.product.carts);
  console.log("STATECART", stateCarts);
  const token = useSelector((state) => state.auth.data.token);

  const getAddressUser = async () => {
    await axios
      .get(`${API}/address`, {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then((res) => {
        const getAddress = res.data.data;
        console.log("addresssss", getAddress);
        setAddress(getAddress);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const kirim = () => {
    let invoice = Math.floor(Math.random() * 100001) + 1;
    let productId = stateCarts
      .filter((item) => item.selected === true)
      .map((item) => {
        return {
          product_id: item.id,
          product_qty: item.qty,
          sub_total_item: item.qty * item.price,
        };
      });
    const sendData = {
      transaction_code: invoice,
      seller_id: stateCarts[0].seller_id,
      id_address: "",
      item: productId,
    };
    dispatch(addToCheckout({ sendData }));
  };

  const handleDeleteCart = (e) => {
    e.preventDefault();
    stateCarts
      .filter((item) => item.selected === true)
      .map((item) => {
        console.log("DELETE CART", deleteCart(item.id));
        return dispatch(deleteCart(item.id));
      });
    setModalShow(false);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 style={{ fontSize: "34px", fontWeight: "700" }}>My Bag</h1>
        {stateCarts.length ? (
          <div className="row">
            <div className="col-12 col-md-8 left">
              <div className="col chart justify-content-between">
                <div className="selectAll">
                  <div className="mt-3">
                    <input
                      type="checkbox"
                      className="cek"
                      onChange={handleSelectAll}
                    />
                  </div>
                  <p className="ml-3 selectitem">
                    {`Select all item (${
                      stateCarts.filter((item) => item.selected === true).length
                    } items selected)`}
                  </p>
                </div>
                <p
                  style={{
                    color: "#DB3022",
                    marginTop: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => setModalShow(true)}
                >
                  Delete
                </p>
              </div>
              {stateCarts.map((item) => {
                return (
                  <div
                    className="row prodct"
                    style={{ marginRight: 0, marginLeft: 0 }}
                    key={item.id}
                  >
                    <div className="col-12 col-sm-5 align-items-center side">
                      <div className="d-flex flex-row align-items-center">
                        <input
                          type="checkbox"
                          className="cek"
                          name={item.name}
                          onChange={handleSelectItem}
                          id={item.id}
                          checked={item.selected}
                        />
                        <div className="d-flex flex-row">
                          <div className="img-chart">
                            <img
                              style={{ height: "70px" }}
                              src={API + item.photo}
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <p className="name-prodct">{item.name}</p>
                            <p className="brand-product text-muted">
                              {item.brand}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-sm-3 align-items-center side">
                      <div
                        className="d-flex justify-content-start align-items-center"
                        style={{}}
                      >
                        {item.qty === 1 ? (
                          <button
                            className="btn-c"
                            style={{
                              backgroundColor: "#D4D4D4",
                              borderRadius: "50px",
                              paddingLeft: "8px",
                              paddingRight: "8px",
                            }}
                          >
                            -
                          </button>
                        ) : (
                          <button
                            className="btn-c"
                            style={{
                              backgroundColor: "#D4D4D4",
                              borderRadius: "50px",
                              paddingLeft: "8px",
                              paddingRight: "8px",
                            }}
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                          >
                            -
                          </button>
                        )}
                        <p
                          style={{
                            marginLeft: "10px",
                            marginBottom: 0,
                            marginRight: "10px",
                          }}
                        >
                          {item.qty}
                        </p>
                        <button
                          className="btn-c"
                          style={{
                            borderRadius: "50px",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            backgroundColor: "#FFFFFF",
                            border: "solid 1px",
                          }}
                          onClick={() => dispatch(increaseQuantity(item.id))}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-6 col-sm-4 align-items-center side">
                      <p className="prc">
                        {`Rp. ${(item.price * item.qty).toLocaleString(
                          "id-ID"
                        )}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-12 col-md-4 right">
              <div className="shop-sumry">
                <p className="smry-title">Shopping summary</p>
                <div className="ttl-price">
                  <p className="text-price text-muted">Total price</p>
                  <p className="pay">
                    Rp.
                    {stateCarts
                      .filter((item) => item.selected === true)
                      .reduce((total, item) => {
                        return total + item.price * item.qty;
                      }, 0)
                      .toLocaleString("id-ID")}
                  </p>
                </div>
                {stateCarts.filter((item) => item.selected === true).length ? (
                  <Link
                    className="text-decoration-none"
                    to={{
                      pathname: "/checkout",
                      data: cart.filter((item) => item.selected === true),
                      address,
                    }}
                  >
                    <button className="btn-buy" onClick={kirim}>
                      <p className="text-buy">Buy</p>
                    </button>
                  </Link>
                ) : (
                  <button
                    className="btn-buy"
                    onClick={() => setShowAlert(true)}
                  >
                    <p className="text-buy">Buy</p>
                  </button>
                )}
              </div>
              {showAlert
                ? (setTimeout(() => {
                    setShowAlert(false);
                  }, 4000),
                  (
                    <Alert
                      // className={classname(
                      //   "mt-5 alert-empty",
                      //   colors.error,
                      //   colors.whiteText
                      // )}
                      variant="dark"
                      onClose={() => setShowAlert(false)}
                      dismissible
                    >
                      <Alert.Heading>Cart is empty!</Alert.Heading>
                      <p>
                        Select at least 1 product to buy, then continue to
                        payment.
                      </p>
                    </Alert>
                  ))
                : ""}
            </div>
          </div>
        ) : (
          <div
            className="d-flex justify-content-center align-items-center mt-10"
            style={{ width: "100%", height: "100%" }}
          >
            <div>
              <img src={emptyCart} style={{ height: "15rem" }} />
            </div>
            <div>
              <h1 style={{ paddingLeft: "10px" }}>Oops, my bag is empty</h1>
              <p style={{ paddingLeft: "10px" }}>
                Please choose the product you like
              </p>
            </div>
          </div>
        )}
      </div>

      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
        onHide={() => setModalShow(false)}
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
              Are you sure want to delete your product?
            </h6>
            <div
              className="login d-flex"
              style={{ justifyContent: "space-between", width: "100%" }}
            >
              <button onClick={() => setModalShow(false)} className="btn-no">
                No
              </button>
              <button
                onClick={handleDeleteCart}
                style={{ marginTop: "20px" }}
                className="btn-login"
              >
                Yes
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Mybag2;
