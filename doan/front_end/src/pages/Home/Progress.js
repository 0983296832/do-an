import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../assets/css/progress.css";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Progress = ({ data }) => {
  const target = 10000000;
  const percentage = ((data.day * 100) / 10000000).toFixed(2);

  return (
    <div className="revenue__progress">
      <div className="progress">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          strokeWidth={5}
        />
      </div>
      <p className="revenue__progress-title">Total sales this day</p>
      <p className="revenue__progress-amount">
        {data.day.toLocaleString("en-US", {
          style: "currency",
          currency: "VND",
        })}
      </p>
      <p className="revenue__progress-desc">
        Previous transactions processing. Last payments may not be included.
      </p>
      <div className="summary">
        <div className="summary__item">
          <div className="item__title">Target</div>
          <div
            className={`item__result ${data.day > target ? "positive" : "negative"
              }`}
          >
            {data.day > target ? (
              <MdKeyboardArrowUp fontSize="small" />
            ) : (
              <MdKeyboardArrowDown fontSize="small" />
            )}

            <div className="result__amount">
              {Number(target).toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          </div>
        </div>
        <div className="summary__item">
          <div className="item__title">This Week</div>
          <div className="item__result positive">
            <MdKeyboardArrowUp fontSize="small" />
            <div className="result__amount">
              {data.week.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          </div>
        </div>
        <div className="summary__item">
          <div className="item__title">This Month</div>
          <div className="item__result positive">
            <MdKeyboardArrowUp fontSize="small" />
            <div className="result__amount">
              {data.month.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
