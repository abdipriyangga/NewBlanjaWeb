import React from "react";
import { Modal, Button } from "react-bootstrap";
import colors from "../../../assets/colors.module.css";
import text from "../../../assets/text.module.css";
import classname from "../../../helpers/classJoiner";
import "./ModalSelectPayment.css";

import gopay from "../../../assets/image/gopay.png";
import pos from "../../../assets/image/pos-indonesia.png";
import mastercard from "../../../assets/image/master-card.png";

const ModalSelectPayment = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="shadow-sm">
        <Modal.Title className="text-top" id="contained-modal-title-vcenter">
          Payment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="no-border modal-body-container">
        <div className="container-modal">
          <div className="row container-item-payment">
            <h4 className={classname(colors.blackText, "text-title-head")}>
              Payment Method
            </h4>
          </div>
          <div className="row align-items-center container-item-payment">
            <img src={gopay} alt="" />
            <h4 className="text-item-payment">Gopay</h4>
            <input
              type="radio"
              name="payment"
              id="gopay"
              value="gopay"
              //   onChange={props.handleSelectPayment}
              className="ml-auto"
            />
          </div>
          <div className="row align-items-center container-item-payment">
            <img src={pos} alt="" />
            <h4 className="text-item-payment">Pos Indonesia</h4>
            <input
              type="radio"
              name="payment"
              id="pos"
              value="pos"
              //   onChange={props.handleSelectPayment}
              className="ml-auto"
            />
          </div>
          <div className="row align-items-center container-item-payment">
            <img src={mastercard} alt="" />
            <h4 className="text-item-payment">Mastercard</h4>
            <input
              type="radio"
              name="payment"
              id="mastercard"
              //   onChange={props.handleSelectPayment}
              value="mastercard"
              className="ml-auto"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Body className="no-border">
        <div className="container-modal">
          <div className="row container-item-payment">
            <h4 className={classname(colors.blackText, "text-title-head")}>
              Shopping summary
            </h4>
          </div>
          <div className="row align-items-center container-item-summary">
            <h4 className={classname(colors.grayText, text.text)}>Order</h4>
            <h3 className="ml-auto text-price">{`Rp${props.cart
              .reduce((total, item) => {
                return total + item.price * item.qty;
              }, 0)
              .toLocaleString("id-ID")}`}</h3>
          </div>
          <div className="row align-items-center container-item-summary">
            <h4 className={classname(colors.grayText, text.text)}>Delivery</h4>
            <h3 className="ml-auto text-price">Rp5.000</h3>
          </div>
        </div>
      </Modal.Body>
      <Modal.Body className="shadow-lg">
        <div className="container-modal-footer">
          <div className="row">
            <div className="col">
              <h4 className={classname(colors.blackText, "text-title-head")}>
                Shopping summary
              </h4>
              <h3
                className={classname(colors.primaryText, "text-price")}
              >{`Rp${props.cart
                .reduce((total, item) => {
                  return total + item.price * item.qty;
                }, 5000)
                .toLocaleString("id-ID")}`}</h3>
            </div>
            <div className="col-5 align-self-center">
              <button
                className="btn btn-danger btn-bu"
                onClick={props.onSubmit}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalSelectPayment;
