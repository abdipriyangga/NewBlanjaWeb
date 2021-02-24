import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import styles from "./modal.module.css";
import { API } from "../../../utility/Auth";
import axios from "axios";

export default function ModalAddAddress(props) {
  const [myaddress, setAddress] = useState({
    fullname: "",
    address: "",
    city: "",
    region: "",
    zip_code: "",
    country: "",
  });
  const [address, setAddresss] = useState(false);


  const history = useHistory();
  const token = useSelector((state) => state.auth.data.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullname, address, city, region, zip_code, country } = myaddress;
    let body = {
      fullname: fullname,
      address: address,
      region: region,
      city: city,
      zip_code: zip_code,
      country: country,
    };
    let formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("address", address);
    formData.append("region", region);
    formData.append("city", city);
    formData.append("zip_code", zip_code);
    formData.append("country", country);

    await axios
      .post(`${API}/address`, body, {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          props.onHide();
          // setAddresss(true);
        } else if (res.data.status === 500) {
          props.onHide();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // if (address === true) {
  //   return <Redirect to="/checkout"/>
  // }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ border: "none" }}>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.container}>
        <h4 className={styles.title}>Add new address</h4>
        <div className={styles.content}>
          <div className={styles.iteminput}>
            <div className={styles.contentinput}>
              <label className={styles.label} for="address">
                Country
              </label>
              <input
                id="address"
                className={styles.input}
                onChange={(e) => {
                  setAddress({ ...myaddress, country: e.target.value });
                }}
              />
            </div>
          </div>

          <div className={styles.iteminput}>
            <div className={styles.contentinput}>
              <label className={styles.label} for="recipients">
                Recipient’s name
              </label>
              <input
                id="recipients"
                className={styles.input}
                onChange={(e) => {
                  setAddress({ ...myaddress, fullname: e.target.value });
                }}
              />
            </div>
            <div className={styles.space}></div>
            <div className={styles.contentinput}>
              <label className={styles.label} for="tlp">
                Recipient's region/province
              </label>
              <input
                id="tlp"
                className={styles.input}
                onChange={(e) => {
                  setAddress({ ...myaddress, region: e.target.value });
                }}
              />
            </div>
          </div>

          <div className={styles.iteminput}>
            <div className={styles.contentinput}>
              <label className={styles.label} for="address">
                Address
              </label>
              <input
                id="address"
                className={styles.input}
                onChange={(e) => {
                  setAddress({ ...myaddress, address: e.target.value });
                }}
              />
            </div>
            <div className={styles.space}></div>
            <div className={styles.contentinput}>
              <label className={styles.label} for="postal">
                Postal code
              </label>
              <input
                id="postal"
                className={styles.input}
                onChange={(e) => {
                  setAddress({ ...myaddress, zip_code: e.target.value });
                }}
              />
            </div>
          </div>

          <div className={styles.iteminput}>
            <div className={styles.contentinput}>
              <label className={styles.label} for="city">
                City or subdistrict
              </label>
              <input
                id="city"
                className={styles.input}
                onChange={(e) => {
                  setAddress({ ...myaddress, city: e.target.value });
                }}
              />
            </div>
            <div className={styles.space}></div>
            <div className={styles.contentinput}></div>
          </div>

          <div className={styles.iteminput}>
            <input
              className={styles.itemcheckbox}
              type="checkbox"
              id="primary"
              value="1"
              onChange={(e) => {
                setAddress({ ...myaddress, primary: e.target.value });
              }}
            />
            <label className={styles.label} for="primary">
              Make it primary addres
            </label>
          </div>
          <div className={styles.iteminput}>
            <div className={styles.contentinput}></div>
            <div className={styles.space}></div>
            <div className={styles.contentbtn}>
              <button onClick={props.onHide} className={styles.btncancel}>
                Cancel
              </button>
              <button
                onClick={(e) => handleSubmit(e)}
                className={styles.btnsave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
