import React from "react";
import "../assets/css/wigget.css";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

const Wigget = ({ data }) => {
  return (
    <div className="wigget__container">
      <div className="wigget__header">
        <h2 className="wigget__title">{data.title}</h2>
        <h3
          className={`wigget__rate ${
            data.isNegative ? "negative" : "positive"
          }`}
        >
          {data.isNegative ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
          {data.rate}
        </h3>
      </div>
      <div className="wigget__main">
        <h2 className="wigget__money">
          {data.isMoney && "đ"}
          <CountUp end={data.number} />
        </h2>
      </div>
      <div className="wigget__bottom">
        <Link to={`${data.path}`} className="wigget__link">
          {data.link}
        </Link>
        {data.icon}
      </div>
    </div>
  );
};

export default Wigget;
