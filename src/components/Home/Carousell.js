import React, { Component } from "react";
import { Image1, Image2, Image3, Image4 } from "../../assets/style";
import Slider from 'react-slick'
import nextArrow from "../../assets/image/nextArrow.png";
import prevArrow from "../../assets/image/prevArrow.png";
import "../../assets/style/home.css";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "white",
        padding: "1.5vw",
        borderRadius: "50%",
        marginRight: "3vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
    >
      <img src={nextArrow} alt="" className="topslider-arrow" />
    </div>
  );
};
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "white",
        marginLeft: "3vw",
        zIndex: 1,
        padding: "1.5vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
      }}
      onClick={onClick}
    >
      <img src={prevArrow} alt="" className="topslider-arrow" />
    </div>
  );
};

const Carousell = () => {
  const data = [
    {
      id: Image1,
      name: "Black Edition",
    },
    {
      id: Image2,
      name: "Trends In 2020",
    },
    {
      id: Image3,
      name: "Black Edition",
    },
    {
      id: Image4,
      name: "Trends In 2020",
    },
  ];

  const settings = {
    dots: true,
    className: "top-slider",
    centerMode: true,
    infinite: true,
    slidesToShow: 2,
    // centerPadding: '160px',
    speed: 500,
    autoplaySpeed: 5000,
    autoplay: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <>
      <div className="container">
        <div>
          <Slider {...settings}>
            {data.map((item, index) => {
              return (
                <div className="topslider-items" key={index}>
                  <div className="topslider-item">
                    <img
                      src={item.id}
                      alt=""
                      className="slider-top-img img-fluid"
                    />
                    <p className="promo-name">{item.name}</p>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Carousell;
