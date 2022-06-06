import React, { useState } from "react";
import { Checkbox } from "antd";
import giay from "../../assets/image/giay.jpg";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

const CartItem = () => {
  const [number, setNumber] = useState(1);

  const checkNagativeNumber = (number) => {
    if (number < 0) {
      setNumber(0);
    }
    return number;
  };
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div className="cart-item">
      <div className="cart-item-left">
        <Checkbox onChange={onChange} />
        <img src={giay} />
        <div>
          <h2>Giày đẹp</h2>
          <h5>Kích thước :33</h5>
          <div className="cart-item-color">
            <h5>Màu sắc: </h5>
            <div
              className="color-btn"
              style={{
                backgroundColor: "black",
                width: "20px",
                height: "20px",
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="cart-number">
        <h3>120000đ</h3>
        <div className="cart-number-list">
          <AiOutlineMinusCircle
            className="dec"
            onClick={() => setNumber((pre) => pre - 1)}
          />
          <div className="num">{checkNagativeNumber(number)}</div>
          <AiOutlinePlusCircle
            className="inc"
            onClick={() => setNumber((pre) => pre + 1)}
          />
        </div>
        <BsTrash className="cart-icon-del" />
      </div>
    </div>
  );
};

export default CartItem;
