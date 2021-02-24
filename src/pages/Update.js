import React, { Component } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Navbar from "../components/Navbar";

const getUrl = "http://localhost:8000/products-update";

class Updateproduct extends Component {
  state = {
    id: "",
    product_price: "",
    product_brand: "",
  };

  handlerChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlerSubmit = async (event) => {
    event.preventDefault();
    await axios.patch(getUrl, this.state);
    alert("Product has been Updated!!");
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h2>Update product baru</h2>
          <form className="col-lg-6" onSubmit={this.handlerSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>ID Product</Form.Label>
              <Form.Control
                type="text"
                name="id"
                placeholder="ID Product"
                onChange={this.handlerChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="product_price"
                placeholder="Price"
                onChange={this.handlerChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="product_brand"
                placeholder="Brand"
                onChange={this.handlerChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Updateproduct;
