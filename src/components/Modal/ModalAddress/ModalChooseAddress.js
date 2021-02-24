import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../../assets/colors.module.css";
import text from "../../../assets/text.module.css";
import classname from "../../../helpers/classJoiner";
import "./ModalChooseAddress.css";
import { API } from "../../../utility/Auth";
import axios from "axios";

const ModalChooseAddress = (props) => {
  const [address, setAddress] = useState([]);
  const [showChooseAddress, setShowChooseAddress] = useState(false);

  const token = useSelector((state) => state.auth.data.token);

  useEffect(() => {
    const unsubscribe = window.addEventListener("focusin", () => {
      getAddressUser(address);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    getAddressUser(address);
  }, [])

  const getAddressUser = async () => {
    await axios
      .get(`${API}/address`, {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then((res) => {
        const address = res.data.data;
        setAddress(address);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // if (showChooseAddress === false) {
  //   getAddressUser();
  // }

  // useEffect(() => {
  //   getAddressUser();
  // }, []);

  return (
    <Modal
      {...props}
      size="lg"
      // show={props.show}
      // changeAddress={props.changeAddress}
      // onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="no-border" />
      <Modal.Body className="no-border">
        <div className="container-modal">
          <div>
            <h4 className="text-top">Choose another address</h4>
          </div>
          <div
            className="add-address"
            onClick={props.showAddAddress}
            closeButton
          >
            <h4 className={classname(colors.grayText, "text-add-addres")}>
              Add new address
            </h4>
          </div>
          {address &&
            address.map(
              ({
                id_address,
                fullname,
                address,
                city,
                region,
                zip_code,
                country,
              }) => {
                return (
                  <div className="container-address-list" key={id_address}>
                    <p className={classname(text.text, "text-title")}>
                      {fullname}
                    </p>
                    <p className="text-addres mb-4">{`${address}, ${city}, Kota. ${city}, Prov. ${region}, ${zip_code}, ${country}`}</p>
                    {/* <Link to={{
                      pathname: `/checkout/${id_address}`,
                      changeAddress
                    }}> */}
                    <h5 style={{ color: "#db3022", cursor: "pointer" }}>
                      Change address
                    </h5>
                    {/* </Link> */}
                  </div>
                );
              }
            )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalChooseAddress;
