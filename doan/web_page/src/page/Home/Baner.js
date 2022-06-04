import React from "react";
import baner1 from "../../assets/image/baner1.webp";
import baner2 from "../../assets/image/baner2.webp";
import baner3 from "../../assets/image/baner3.webp";
import "../../assets/css/baner.css";

const Baner = () => {
  return (
    <div className="banner-container">
      <div className="banner">
        <img src={baner1} alt="" />
      </div>
      <div className="banner-right">
        <div className="banner">
          <img src={baner2} alt="" />

          <div className="banner-content">
            <h3>Nike Jordan</h3>
            <a>XEM NGAY BỘ SƯU TẬP</a>
          </div>
        </div>
        <div className="banner">
          <img src={baner3} alt="" />

          <div className="banner-content">
            <h3>Nike Jordan</h3>
            <a>XEM NGAY BỘ SƯU TẬP</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Baner;
