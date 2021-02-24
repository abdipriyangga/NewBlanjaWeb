import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Logo } from "../assets/style";
import { Link } from "react-router-dom";
import Login from "../components/Auth/Login/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { authLogOutCreator } from "../redux/actions/auth";
import "../assets/style/style.css";
import "./Navbar/style.css";
import SearchBar from "./SearchBar/SearchBar";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Navbar = ({ changeToLogin, changeToRegister, props }) => {
  const dispatch = useDispatch();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const isLogin = useSelector((state) => state.auth.isFulfilled);
  const token = useSelector((state) => state.auth.data.token);
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [listCategory, setListCategory] = useState("");

  const [listSize, setListSize] = useState("");
  const [listColor, setListColor] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [sizeName, setSizeName] = useState("");
  const [colorName, setColorName] = useState("");
  const [colorPick, setColorPick] = useState("");
  const [categoryPick, setCategoryPick] = useState("");
  const [sizePick, setSizePick] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getCategories = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/categories`)
      .then((res) => {
        const getCategory = res.data.data;
        const categoryName = res.data.data.category_name;
        setCategoryName(categoryName);
        setListCategory(getCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSizes = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/sizes`)
      .then((res) => {
        const getSize = res.data.data;
        const sizeName = res.data.data.size;
        setSizeName(sizeName);
        setListSize(getSize);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getColors = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/colors`)
      .then((res) => {
        const getColor = res.data.data;
        const colorName = res.data.data.color_name;
        setColorName(colorName);
        setListColor(getColor);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    axios
      .delete(process.env.REACT_APP_URL + "/auth/logout", {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then(async (res) => {
        dispatch(authLogOutCreator());
        setIsLogout(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getColors();
    getCategories();
    getSizes();
  }, []);

  if (isLogout === true) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <div className="shadow p-3 mb-5 bg-white sticky-top">
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <div className="col-sm-2 col-lg-2 gap">
              <Link to="/" style={{ textDecoration: "none" }}>
                <div className="logo-brand">
                  <img src={Logo} alt="logo-shop" />
                  <h1>Blanja</h1>
                </div>
              </Link>
            </div>
            <button
              className="navbar-toggler float-right"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded={!isNavCollapsed ? true : false}
              aria-label="Toggle navigation"
              onClick={handleNavCollapse}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="col-12 col-sm-10 col-lg-10 d-flex flex-row gap"
              class={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
              id="navbarSupportedContent"
            >
              <div className="col-sm-12 col-lg-7 gap">
                <div className="d-flex flex-row align-items-center">
                  <SearchBar props={props} />
                  <button
                    className="btn my-2 my-sm-0 fal fa-filter filter"
                    variant="link"
                    onClick={handleShow}
                  ></button>
                  <div className="shopping">
                    <Link to={"/mybag"}>
                      <button
                        variant="link"
                        className="btn my-2 my-sm-2 my-md-2 far fa-shopping-cart"
                        id="shopping"
                        type="submit"
                      ></button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-5 gap">
                {isLogin !== true ? (
                  <>
                    <div className="align-items-center d-flex justify-content-end">
                      <Link to="/login">
                        <div className="login">
                          <button
                            type="submit"
                            className="btn-login btn my-2 my-sm-2"
                          >
                            Login
                          </button>
                        </div>
                      </Link>
                      <div className="signup">
                        <button
                          type="submit"
                          className="btn-signup btn my-2 my-sm-2"
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="align-items-center d-flex justify-content-around">
                      <FontAwesomeIcon
                        style={{ color: "#d4d4d4" }}
                        icon={faBell}
                      />
                      <Link to="/chat">
                      <FontAwesomeIcon
                        style={{ color: "#d4d4d4" }}
                        icon={faEnvelope}
                      />
                      </Link>
                      <Link to="/profile">
                        <div className="dp-profil-nav">
                          <img className="img-profil-nav" alt="" />
                        </div>
                      </Link>
                      <div className="login">
                        <button
                          type="submit"
                          className="btn-login btn my-2 my-sm-2"
                          onClick={() => setModalShow(true)}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>

      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Header>
          <Modal.Title className="ml-6">Color</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            {listColor &&
              listColor.map(({ id, color_name, color_hexa }) => {
                return (
                  <button
                    type="submit"
                    className="color mr-3"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      borderWidth: "2px",
                      borderColor:
                        color_name === colorPick ? color_hexa : "white",
                      backgroundColor: color_hexa,
                    }}
                    // onClick={() => setWarna(color_name)}
                    onClick={() => {
                      setColor(id);
                      setColorPick(color_name);
                      setColorName(color_name);
                    }}
                  ></button>
                );
              })}
          </div>
        </Modal.Body>

        <Modal.Header>
          <Modal.Title className="ml-6">Size</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="col-12 ">
            {listSize &&
              listSize.map(({ id, size }) => {
                return (
                  <button
                    type="submit"
                    className="size mr-3"
                    style={{
                      width: "60px",
                      marginLeft: "5px",
                      marginRight: "5px",
                      marginTop: '10px',
                      padding: "5px",
                      borderRadius: "8px",
                      color: size === sizePick ? "white" : "black",
                      backgroundColor: size === sizePick ? "red" : "white",
                      borderWidth: "1px",
                    }}
                    onClick={() => {
                      setSize(id);
                      setSizePick(size);
                      setSizeName(size)
                    }}
                  >
                    {size}
                  </button>
                );
              })}
          </div>
        </Modal.Body>

        <Modal.Header>
          <Modal.Title className="ml-6">Category</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="d-flex">
            {listCategory &&
              listCategory.map(({ id_categories, category_name }) => {
                return (
                  <button
                    className="category mr-3"
                    style={{
                      width: "100px",
                      height: "40px",
                      borderRadius: "8px",
                      color: category_name === categoryPick ? "white" : "black",
                      backgroundColor:
                        category_name === categoryPick ? "red" : "white",
                      borderWidth: "1px",
                    }}
                    onClick={() => {
                      setCategory(id_categories);
                      setCategoryPick(category_name);
                      setCategoryName(category_name);
                    }}
                  >
                    {category_name}
                  </button>
                );
              })}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className="d-flex justify-content-center">
            <button className="discard mr-3" onClick={handleClose}>
              Discard
            </button>
            <Link
              to={{
                pathname: "/filter",
                search: `?category=${categoryName}&size=${sizeName}&color=${colorName}`,
                categoryName,
                colorName,
                sizeName,
                category,
                color,
                size,
              }}
            >
              <button className="discard mr-4" onClick={handleClose}>
                Apply
              </button>
            </Link>
          </div>
        </Modal.Footer>
      </Modal>
      {/* -------------------------- MODAL LOGOUT ---------------------------- */}
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
            <h6 style={{ fontSize: "15px", marginBottom: "15px" }}>
              Are you sure to log out?
            </h6>
            <div
              className="login"
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                onClick={handleLogout}
                style={{ marginTop: "20px" }}
                className="btn-login"
              >
                Logout
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navbar;
