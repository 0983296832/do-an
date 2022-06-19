import React from "react";
import baner1 from "../../assets/image/baner1.webp";
import baner2 from "../../assets/image/baner2.webp";
import baner3 from "../../assets/image/baner3.webp";
import "../../assets/css/baner.css";
import { Link } from "react-router-dom";

const Baner = () => {
  return (
    <div className="banner-container">
      <div className="banner">
        <img
          src={baner1}
          alt=""
          style={{ width: 800, height: 547, objectFit: "cover" }}
        />
      </div>
      <div className="banner-right">
        <div className="banner">
          <img
            src={baner2}
            alt=""
            style={{ width: 550, height: 263, objectFit: "cover" }}
          />

          <div className="banner-content">
            <h3>Nike Jordan</h3>
            <Link to="/product-list/Nike">XEM NGAY BỘ SƯU TẬP</Link>
          </div>
        </div>
        <div className="banner">
          <img
            src={baner3}
            alt=""
            style={{ width: 550, height: 263, objectFit: "cover" }}
          />

          <div className="banner-content">
            <h3>Adidas</h3>
            <Link to="/product-list/Adidas">XEM NGAY BỘ SƯU TẬP</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Baner;
