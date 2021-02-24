import React, { Component } from "react";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import "./rating.css";

export default class rating extends Component {
  render() {
    const { product_rating } = this.props;
    // let rate = "";
    // for (let i = 0; i < product_rating; i++) {
    //   rate += i;
    // }
    // let lop = rate.split("");
    return (
      <div>
        <div className="rating">
          <div
            className="d-flex"
            style={{ height: "15px", alignItems: "center" }}
          >
            {/* {lop.map((data) => {
              return <img src={Rate} alt="" />;
            })} */}
            <Rater
              total={5}
              rating={product_rating == null ? 0 : Math.round(product_rating)}
              interactive={false}
            />
            <p className="" style={{ height: "8px", marginLeft: "5px" }}>
              ({product_rating})
            </p>
          </div>
        </div>
      </div>
    );
  }
}