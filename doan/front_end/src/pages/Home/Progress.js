import React from "react";
import { Card } from "antd";
import { FiMoreVertical } from "react-icons/fi";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../assets/css/progress.css";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Progress = () => {
  const percentage = 66;

  return (
    <Card
      size="small"
      title="Total Revenue"
      extra={<FiMoreVertical className="progress-icon"/>}
      headStyle={{ color: "gray" }}
      style={{
        width: 370,
        boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
        borderRadius: "8px",
      }}
      bordered={false}
    >
      <div className="revenue__progress">
        <div className="progress">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            strokeWidth={5}
          />
        </div>
        <p className="revenue__progress-title">Total sales made today</p>
        <p className="revenue__progress-amount">$420</p>
        <p className="revenue__progress-desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="summary__item">
            <div className="item__title">Target</div>
            <div className="item__result negative">
              <MdKeyboardArrowDown fontSize="small" />
              <div className="result__amount">$12.4k</div>
            </div>
          </div>
          <div className="summary__item">
            <div className="item__title">Last Week</div>
            <div className="item__result positive">
              <MdKeyboardArrowUp fontSize="small" />
              <div className="result__amount">$12.4k</div>
            </div>
          </div>
          <div className="summary__item">
            <div className="item__title">Last Month</div>
            <div className="item__result positive">
              <MdKeyboardArrowUp fontSize="small" />
              <div className="result__amount">$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Progress;
