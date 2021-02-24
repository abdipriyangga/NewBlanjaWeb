import React, { Component } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Navbar from "../components/Navbar";

class PostProduct extends Component {
  state = {
    product_name: "",
    product_brand: "",
    product_description: "",
    product_price: "",
    category_id: "",
    product_qty: "",
    product_color: "",
    product_size: "",
    product_condition: "",
    product_rating: "",
  };

  handlerChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handlerSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:8000/products", this.state);
    alert("Add Product has been succesfully");
    this.props.history.push("/");
  };
  render() {
    console.log(this.state);
    return (
      <>
        <Navbar />

        <div className="container">
          <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
            Tambah Product Baru
          </h1>
          <form className="col-lg-6" onSubmit={this.handlerSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name product</Form.Label>
              <Form.Control
                type="text"
                name="product_name"
                placeholder="Name Product"
                onChange={this.handlerChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category_id"
                placeholder="Category"
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
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                name="product_price"
                placeholder="Product Price"
                onChange={this.handlerChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Product Rating</Form.Label>
              <Form.Control
                type="number"
                name="product_rating"
                placeholder="Product Rating"
                onChange={this.handlerChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                name="product_description"
                placeholder="Product Description"
                onChange={this.handlerChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Product Size</Form.Label>
              <Form.Control
                type="number"
                name="product_size"
                placeholder="Product Size"
                onChange={this.handlerChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Product Color</Form.Label>
              <Form.Control
                type="text"
                name="product_color"
                placeholder="Product Color"
                onChange={this.handlerChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Product Quantity</Form.Label>
              <Form.Control
                type="number"
                name="product_qty"
                placeholder="Product Quantity"
                onChange={this.handlerChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Product Condition</Form.Label>
              <Form.Control
                type="text"
                name="product_condition"
                placeholder="Product Condition"
                onChange={this.handlerChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </>
    );
  }
}

export default PostProduct;
