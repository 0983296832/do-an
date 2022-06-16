import React, { useState, useContext } from "react";
import "../../assets/css/details.css";
import { Divider, Rate } from "antd";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading";
import Toast from "../../components/Toast";

const Details = ({ data, loading, id }) => {
  const { addToCart } = useContext(CartContext);
  const { auth } = useContext(AuthContext);
  const [activeSize, setActiveSize] = useState();
  const [activeColor, setActiveColor] = useState();
  const [number, setNumber] = useState(1);

  const handleAddToCart = (data) => {
    console.log(data);
    if (!data.product_color || !data.product_size) {
      Toast("error", "Chưa có màu sắc hoặc size");
      return;
    } else {
      addToCart(data);
    }
  };
  const checkNagativeNumber = (number) => {
    if (number < 0) {
      setNumber(0);
    }
    return number;
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h2>{data?.title}</h2>
      <div className="details-rate">
        <Rate
          disabled
          defaultValue={data?.rate}
          style={{ fontSize: 15, marginRight: 10 }}
        />
        <span>({data?.comments?.length} đánh giá của khách hàng)</span>
      </div>
      <div className="details-price">
        {data?.discount > 0 && <h2 className="sale">{data?.price}đ</h2>}

        <h2>{data?.priceSale}đ</h2>
        <span style={{ fontSize: 15, marginRight: 10 }}>
          ({data?.sales} sản phẩm đã bán)
        </span>
      </div>
      <Divider />
      <div className="details-info">
        <li>
          Trạng thái:&nbsp; <span>Còn hàng ({data?.stocks} sản phẩm)</span>
        </li>
        <li>
          Tình trạng : &nbsp;<span>Hàng mới 100%</span>
        </li>
        <li>
          Bảo Hành: &nbsp;<span> 6 Tháng</span>
        </li>
      </div>
      <Divider />
      <div className="details-size">
        <h2>Chọn Size:</h2>
        <div className="size-list">
          {data.size &&
            data?.size.map((size, index) => {
              return (
                <div
                  className={`sizeNumber ${
                    index === activeSize && "activeSize"
                  }`}
                  key={index}
                  onClick={() => setActiveSize(index)}
                >
                  {size}
                </div>
              );
            })}
        </div>
      </div>
      <Divider />
      <div className="details-size">
        <h2>Chọn Màu:</h2>
        <div className="size-list">
          {data.color &&
            data?.color.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`color-btn ${
                    index === activeColor && "activeColor"
                  }`}
                  style={{ backgroundColor: item }}
                  onClick={() => setActiveColor(index)}
                ></div>
              );
            })}
        </div>
      </div>
      <Divider />
      <div className="details-number">
        <h2>Số Lượng:</h2>
        <div className="num-list">
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
      </div>
      <Divider />
      <div className="btn-group">
        <button
          className="add-cart"
          onClick={() =>
            handleAddToCart({
              user_id: auth.data ? auth?.data._id : "",
              product_id: id,
              product_code: data?.product_code,
              product_name: data?.title,
              product_price: data?.priceSale,
              product_image: data?.image,
              product_quantity: number,
              product_size: data?.size[activeSize],
              product_color: data?.color[activeColor],
              product_brand: data?.brand,
              product_category: data?.category,
            })
          }
        >
          THÊM VÀO GIỎ HÀNG
        </button>
        <Link to="/cart" className="buy-now">
          MUA NGAY
        </Link>
      </div>
    </div>
  );
};

export default Details;
