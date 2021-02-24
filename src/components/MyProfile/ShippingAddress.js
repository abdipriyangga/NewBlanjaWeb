import React, { useState, useEffect } from "react";
import styles from "./another.module.css";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { API } from "../../utility/Auth";
import Sidebar from "../SidebarProfile/Sidebar";
import { Jumbotron } from "react-bootstrap";
import ModalChooseAddress from "../Modal/ModalAddress/ModalAddAddress";

export default function ShippingAddress() {
  const [showChooseAddress, setShowChooseAddress] = useState(false);
  const [changeAddress, setChangeAddress] = useState([]);

  const token = useSelector((state) => state.auth.data.token);

  useEffect(() => {
    const unsubscribe = window.addEventListener("pageshow", () => {
      getAddressUser(changeAddress);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    getAddressUser(changeAddress);
  }, []);

  const getAddressUser = async () => {
    await axios
      .get(`${API}/address`, {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then((res) => {
        const address = res.data.data;
        setChangeAddress(address);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="container-selling">
          <Jumbotron
            className="container-content"
            style={{ height: "90%", backgroundColor: "white" }}
          >
            {/* Header */}
            <div className={styles.header}>
              <h6 className={styles.title}>Choose another address</h6>
              <p className={styles.subtitle}>Manage your shipping address</p>
            </div>

            {/* FormContainer */}
            <div className={styles.addresscontainer}>
              {changeAddress.length === 0 ? (
                <div className={styles.addnewaddress}>
                  <h5
                    className={styles.addtext}
                    onClick={() => setShowChooseAddress(true)}
                  >
                    Add new address
                  </h5>
                </div>
              ) : (
                <>
                  <div className={styles.addnewaddress}>
                    <h5
                      className={styles.addtext}
                      onClick={() => setShowChooseAddress(true)}
                    >
                      Add new address
                    </h5>
                  </div>
                  {changeAddress &&
                    changeAddress.map((address) => {
                      return (
                        <div
                          className={styles.listaddress}
                          key={address.id_address}
                        >
                          {/* <h5 className={styles.delete}>DELETE</h5> */}
                          <h5 className={styles.listtitle}>
                            {address.fullname}
                          </h5>
                          <p className={styles.detailaddres}>
                            {`${address.address}, ${address.city}, Kota. ${address.city}, Prov. ${address.region}, ${address.zip_code}, ${address.country}`}
                          </p>
                          <h5 className={styles.changeaddress}>
                            Change address
                          </h5>
                        </div>
                      );
                    })}
                </>
              )}
            </div>
            {/* </div> */}
          </Jumbotron>
        </div>
      </div>
      <ModalChooseAddress
        show={showChooseAddress}
        onHide={() => setShowChooseAddress(false)}
      />
    </>
  );
}
