import React, { useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { useSelector } from "react-redux";
import Sidebar from "../SidebarProfile/Sidebar";
import Navbar from "../Navbar";
import axios from "axios";
import NotFound from "../../assets/image/ordernot.png";
const getUrl = process.env.REACT_APP_URL;

const GetOrder = () => {
  const [order, setOrder] = useState([]);
  const token = useSelector((state) => state.auth.data.token);
  const getOrder = () => {
    axios
      .get(`${getUrl}/orders`, {
        headers: {
          "x-access-token": "Bearer " + token,
        },
      })
      .then(({ data }) => {
        const order = data.data;
        console.log("ini order", order);
        setOrder(order);
      })
      .catch((err) => {
        console.log("ini error", err.response);
      });
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="container-selling" style={{ height: "100%" }}>
          <Jumbotron
            className="container-content"
            style={{
              padding: "20px",
              height: "100%",
              backgroundColor: "#FFFFFF",
            }}
          >
            <h3>My Order</h3>
            <hr></hr>
            {order.length === 0 ? (
              <div className="d-flex justify-content-center align-items-center mt-10">
                <img src={NotFound} style={{ height: "15rem" }} />
              </div>
            ) : (
              <div className="container">
                <div className="d-flex">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Transaction Code</th>
                        <th scope="col">Status Order</th>
                        <th scope="col">Address</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Product Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.map(
                        ({
                          id,
                          transaction_code,
                          total,
                          status_order,
                          address,
                          order_detail,
                        }) => {
                          return (
                            <>
                              <tr>
                                <td>{transaction_code}</td>
                                <td>{status_order}</td>
                                <td>{address}</td>
                                <td>Rp. {total}</td>

                                {order_detail.map(
                                  ({ category_name, product_name }) => {
                                    return (
                                      <>
                                        <td>{product_name}</td>
                                      </>
                                    );
                                  }
                                )}
                              </tr>
                            </>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Jumbotron>
        </div>
      </div>
    </>
  );
};

export default GetOrder;
