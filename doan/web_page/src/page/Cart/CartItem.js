import React, { useContext, useState } from "react";
import { Checkbox } from "antd";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { CartContext } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);
  const [number, setNumber] = useState(item.product_quantity);

  const checkNagativeNumber = (number) => {
    if (number < 0) {
      setNumber(0);
    }
    return number;
  };
  const checkLongContent = (content) => {
    if (content.length > 20) {
      return content.slice(0, 20) + "...";
    }
    return content;
  };

  const increase = async () => {
    await increaseQuantity(item.id, number + 1);
    setNumber((pre) => pre + 1);
  };
  const decrease = async () => {
    await decreaseQuantity(item.id, number - 1);
    setNumber((pre) => pre - 1);
  };
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div className="cart-item">
      <div className="cart-item-left">
        <Checkbox onChange={onChange} />
        <img src={item.product_image} />
        <div>
          <h2>{checkLongContent(item.product_name)}</h2>
          <h5>Kích thước :{item.product_size}</h5>
          <div className="cart-item-color">
            <h5>Màu sắc: </h5>
            <div
              className="color-btn"
              style={{
                backgroundColor: item.product_color,
                width: "20px",
                height: "20px",
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="cart-number">
        <h3>{item.product_price}đ</h3>
        <div className="cart-number-list">
          <AiOutlineMinusCircle className="dec" onClick={decrease} />
          <div className="num">{checkNagativeNumber(number)}</div>
          <AiOutlinePlusCircle className="inc" onClick={increase} />
        </div>
        <BsTrash
          className="cart-icon-del"
          onClick={() => removeFromCart(item._id)}
        />
      </div>
    </div>
  );
};

export default CartItem;
