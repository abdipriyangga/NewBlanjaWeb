import React, { useState, useEffect } from "react";
import { Jumbotron, Form } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import Sidebar from "../SidebarProfile/Sidebar";
import Navbar from "../Navbar";
import formattext from "../../assets/image/formattext.png";
import main from "../../assets/image/mainphoto.png";
import secondary from "../../assets/image/secondaryphoto.png";
import styles from "./styling.module.css";
import "./add.css";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, toast } from "react-toastify";
import { API } from "../../utility/Auth";
import { Redirect } from 'react-router-dom';

toast.configure();
const AddProduct = () => {
  const [addP, setAddP] = useState(false)
  useEffect(() => {
    getCategory();
    getSize();
    getColor();
    getCondition();
    getStatus();
  }, []);

  const addOrRemoveSelected = (id) => {
    const result = size.find((s) => s.id === id);
    if (result.is_selected) {
      const temp = size;
      const index = temp.findIndex((e) => e.id === id);
      temp[index]["is_selected"] = false;
      setSize([...temp]);
    } else {
      const temp = size;
      const index = temp.findIndex((e) => e.id === id);
      temp[index]["is_selected"] = true;
      setSize([...temp]);
    }
  };

  const addOrRemoveColorSelected = (id) => {
    const result = color.find((c) => c.id === id);
    if (result.is_selected) {
      const temp = color;
      const index = temp.findIndex((e) => e.id === id);
      temp[index]["is_selected"] = false;
      setColor([...temp]);
    } else {
      const temp = color;
      const index = temp.findIndex((e) => e.id === id);
      temp[index]["is_selected"] = true;
      setColor([...temp]);
    }
  };

  const restructureIsSelected = (data) => {
    const temp = data.map((data) => {
      data["is_selected"] = false;
      return data;
    });
    return temp;
  };

  const [filePath, setFilePath] = useState([]);
  const [prodName, setProdName] = useState("");
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [condition, setCondition] = useState([]);
  const [prodPrice, setProdPrice] = useState("");
  const [prodQty, setProdQty] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [status, setStatus] = useState([]);
  const [ctg, setCtg] = useState(0);
  const [cnd, setCnd] = useState(1);
  const [sts, setSts] = useState(0);


  const token = useSelector((state) => state.auth.data.token);

  const formatDataSizeToSend = (dataSize) => {
    const selectedSizes = [];
    dataSize.forEach((s) => {
      if (s.is_selected) {
        selectedSizes.push(s.id);
      }
    });
    return selectedSizes;
  };

  const formatDataColorToSend = (dataColor) => {
    const selectedColors = [];
    dataColor.forEach((c) => {
      if (c.is_selected) {
        selectedColors.push(c.id);
      }
    });
    return selectedColors;
  };

  const getCategory = async () => {
    await axios
      .get(API + "/categories")
      .then((res) => {
        const categories = res.data.data;
        setCategories(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSize = async () => {
    await axios
      .get(API + "/sizes")
      .then((res) => {
        const size = res.data.data;
        setSize(restructureIsSelected(size));
        console.log("SIZE", size);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getColor = async () => {
    await axios
      .get(API + "/colors")
      .then((res) => {
        const color = res.data.data;
        setColor(restructureIsSelected(color));
        console.log("color", restructureIsSelected(color));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCondition = async () => {
    await axios
      .get(API + "/condition")
      .then((res) => {
        const condition = res.data.data;
        console.log("kondisi", condition);
        setCondition(condition);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatus = async () => {
    await axios
      .get(API + "/status")
      .then((res) => {
        const status = res.data.data;
        console.log("status", status);
        setStatus(status);
      })
      .catch((err) => {
        console.log("error status", err);
      });
  };

  const inputRef = React.useRef();
  const handleFile = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("product_name", prodName);
    data.append("category_id", ctg);
    formatDataSizeToSend(size).map((element) => {
      data.append("sizes[]", JSON.stringify(element));
    });
    formatDataColorToSend(color).map((element) => {
      data.append("colors[]", JSON.stringify(element));
    });
    data.append("condition_id", cnd);
    data.append("product_price", prodPrice);
    data.append("product_qty", prodQty);
    data.append("product_desc", prodDesc);
    for (let i = 0; i < filePath.length; i++) {
      data.append("image", filePath[i]);
    }

    data.append("status_product_id", sts);

    await axios
      .post(API + "/products", data, {
        headers: {
          "x-access-token": "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Product added successfull!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          transition: Bounce,
        });
        setAddP(true)
      })
      .catch((err) => {
        console.log("bisa error", err.response);
      });
  };

  if(addP === true) {
    return <Redirect to="/myproduct" />
  }

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="container-selling">
          <input
            multiple
            type="file"
            onChange={(e) => setFilePath(e.target.files)}
            ref={inputRef}
            name="image"
            className={styles.hiddeninput}
          />
          <Form>
            <Jumbotron className="container-content">
              <h3>Inventory</h3>
              <hr></hr>

              <div className="row">
                <div className="col-md-8">
                  <Form.Group controlId="product_name">
                    <Form.Label className="font-p-title">
                      Name of goods
                    </Form.Label>
                    <Form.Control
                      placeholder="Product Name"
                      value={prodName}
                      onChange={(e) => {
                        setProdName(e.target.value);
                      }}
                    />
                  </Form.Group>
                </div>
              </div>
            </Jumbotron>
            <Jumbotron className="container-gap">
              <h3>Item details</h3>
              <hr></hr>

              <div className="row">
                <div className="col-md-8">
                  <Form.Group controlId="product_price">
                    <Form.Label className="font-p-title">Unit Price</Form.Label>
                    <Form.Control
                      placeholder="Price"
                      value={prodPrice}
                      onChange={(e) => {
                        setProdPrice(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="product_stock">
                    <Form.Label className="font-p-title">Stock</Form.Label>
                    <Form.Control
                      placeholder="Stock Product"
                      value={prodQty}
                      onChange={(e) => {
                        setProdQty(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <div className="form-group">
                    <label>Category </label>
                    <br></br>
                    <select
                      className="form-control col-6"
                      value={ctg}
                      onChange={(e) => {
                        setCtg(e.target.value);
                      }}
                    >
                      {categories &&
                        categories.map(({ id_categories, category_name }) => {
                          return (
                            <>
                              <option value={id_categories}>
                                {category_name}
                              </option>
                            </>
                          );
                        })}
                    </select>
                  </div>

                  <Form.Group className="form-group">
                    <Form.Label>Colors </Form.Label>
                    <br></br>
                    <Form.Control
                      className="form-control col-6"
                      multiple
                      as="select"
                      value={color}
                    >
                      {color &&
                        color.map(
                          ({ id, color_name, is_selected, color_hexa }) => {
                            return (
                              <>
                                <option
                                  style={
                                    is_selected === true
                                      ? {
                                          backgroundColor: color_hexa,
                                          color: "white",
                                        }
                                      : { backgroundColor: "white" }
                                  }
                                  className="mb-1"
                                  key={id.toString()}
                                  value={id}
                                  onClick={() => {
                                    addOrRemoveColorSelected(id);
                                  }}
                                >
                                  {color_name}
                                </option>
                              </>
                            );
                          }
                        )}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Size </Form.Label>
                    <br></br>
                    <Form.Control
                      className="form-control col-6"
                      multiple
                      as="select"
                      value={size}
                    >
                      {size &&
                        size.map(({ id, size, is_selected }) => {
                          return (
                            <option
                              style={
                                is_selected === true
                                  ? { backgroundColor: "red", color: "white" }
                                  : { backgroundColor: "white" }
                              }
                              className="mb-1"
                              key={id.toString()}
                              value={id}
                              onClick={() => {
                                addOrRemoveSelected(id);
                              }}
                            >
                              {size}
                            </option>
                          );
                        })}
                    </Form.Control>
                  </Form.Group>

                  <div className="form-group">
                    <label>Conditions Product </label>
                    <br></br>
                    <select
                      className="form-control col-6"
                      value={cnd}
                      onChange={(e) => {
                        setCnd(e.target.value);
                      }}
                    >
                      {condition &&
                        condition.map(({ id, conditions }) => {
                          return (
                            <>
                              <option value={id}>{conditions}</option>
                            </>
                          );
                        })}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Status Product </label>
                    <br></br>
                    <select
                      className="form-control col-6"
                      value={sts}
                      onChange={(e) => {
                        setSts(e.target.value);
                      }}
                    >
                      {status &&
                        status.map(({ id, name }) => {
                          return (
                            <>
                              <option value={id}>{name}</option>
                            </>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
            </Jumbotron>
            <Jumbotron className="container-gap">
              <h3>Photo of goods</h3>
              <div className={styles.formcontainer}>
                <div className={(styles.form, styles.formcontainer_img)}>
                  <div className={styles.content_img}>
                    <div className={styles.main_img}>
                      <div className={styles.containerMainImg}>
                        <img
                          className={styles.mainImg}
                          src={
                            filePath[0]
                              ? URL.createObjectURL(filePath[0])
                              : main
                          }
                          alt=""
                        />
                      </div>
                      <p className={styles.mainPhoto}>Foto utama</p>
                    </div>
                    <div className={styles.secondary_img}>
                      <img
                        className={styles.secondaryImg}
                        src={
                          filePath[1]
                            ? URL.createObjectURL(filePath[1])
                            : secondary
                        }
                        alt=""
                      />
                    </div>
                    <div className={styles.secondary_img}>
                      <img
                        className={styles.secondaryImg}
                        src={
                          filePath[2]
                            ? URL.createObjectURL(filePath[2])
                            : secondary
                        }
                        alt=""
                      />
                    </div>
                    <div className={styles.secondary_img}>
                      <img
                        className={styles.secondaryImg}
                        src={
                          filePath[3]
                            ? URL.createObjectURL(filePath[3])
                            : secondary
                        }
                        alt=""
                      />
                    </div>
                    <div className={styles.secondary_img}>
                      <img
                        className={styles.secondaryImg}
                        src={
                          filePath[4]
                            ? URL.createObjectURL(filePath[4])
                            : secondary
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={styles.edit_img}>
                    <button onClick={handleFile} className={styles.btnupload}>
                      Upload image
                    </button>
                  </div>
                </div>
              </div>
            </Jumbotron>

            <Jumbotron className="container-gap">
              <h3>Description</h3>
              <hr></hr>
              <div className={styles.formcontainer}>
                <div
                  className={(styles.form, styles.formcontainer_description)}
                >
                  <img
                    src={formattext}
                    alt=""
                    style={{ backgroundColor: "white" }}
                  />
                  <textarea
                    value={prodDesc}
                    className={styles.content_description}
                    onChange={(e) => {
                      setProdDesc(e.target.value);
                    }}
                  />
                </div>
              </div>
            </Jumbotron>
            <div className="container-btn d-flex justify-content-end mb-5">
              <button
                className="btn-login-nav save"
                onClick={(e) => handleSubmit(e)}
              >
                Sell
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
