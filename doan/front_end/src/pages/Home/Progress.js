import React from "react";
import { Card } from "antd";
import { FiMoreVertical } from "react-icons/fi";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../assets/css/progress.css";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Progress = ({ data }) => {
  const target = 10000000;
  const percentage = (data.day * 100) / 10000000;

  return (
    <Card
      size="small"
      title="Tổng Doanh Thu"
      extra={<FiMoreVertical className="progress-icon" />}
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
        <p className="revenue__progress-title">
          Tổng doanh số bán hàng hôm nay
        </p>
        <p className="revenue__progress-amount">
          {data.day.toLocaleString("en-US", {
            style: "currency",
            currency: "VND",
          })}
        </p>
        <p className="revenue__progress-desc">
          Xử lý các giao dịch trước đó. Các khoản thanh toán cuối cùng có thể
          không được bao gồm.
        </p>
        <div className="summary">
          <div className="summary__item">
            <div className="item__title">Mục tiêu</div>
            <div
              className={`item__result ${
                data.day > target ? "positive" : "negative"
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
            <div className="item__title">Tuần này</div>
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
            <div className="item__title">Tháng này</div>
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
    </Card>
  );
};

export default Progress;
