import React, { useState, useContext, useEffect } from "react";
import "../../assets/css/details.css";
import { Divider, Rate } from "antd";
import {
  AiOutlineHeart,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiOutlineShareAlt,
  AiFillHeart,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading";
import Toast from "../../components/Toast";
import { v4 as uuidv4 } from "uuid";
import { BsMessenger } from "react-icons/bs";
import Users from "../../services/userServices";

const Details = ({ data, loading, id }) => {
  let navigate = useNavigate();
  const { addToCart, totalCart } = useContext(CartContext);
  const { auth } = useContext(AuthContext);
  const [activeSize, setActiveSize] = useState();
  const [activeColor, setActiveColor] = useState();
  const [number, setNumber] = useState(1);
  const [liked, setLiked] = useState(false);


  useEffect(() => {
    const getLiked = async () => {
      try {
        if (!auth.data) return;
        const data = await Users.getFavorite(auth.data._id);
        if (data.data.find((i) => i._id == id)) setLiked(true);
      } catch (error) {
        Toast("error", error.message);
      }
    };
    getLiked();
  }, []);

  const handleAddToCart = (item) => {
    if (data?.stocks == 0) {
      Toast("error", "Sản phẩm đã hết hàng");
      return
    }

    if (data?.details?.find(i => i.color == data?.color[activeColor] && i.size == data?.size[activeSize])?.quantity < number || data?.details?.find(i => i.color == data?.color[activeColor] && i.size == data?.size[activeSize])?.quantity == undefined) {
      Toast("error", "Số lượng trong kho không đủ");
      return
    }
    if (!item.product_color || !item.product_size) {
      Toast("error", "Chưa có màu sắc hoặc size");
      return;
    } else {
      addToCart(item);
    }
  };

  const handleBuyNow = async (item) => {
    if (data?.stocks == 0) {
      Toast("error", "Sản phẩm đã hết hàng");
      return
    }
    if (data?.details?.find(i => i.color == data?.color[activeColor] && i.size == data?.size[activeSize])?.quantity < number || data?.details?.find(i => i.color == data?.color[activeColor] && i.size == data?.size[activeSize])?.quantity == undefined) {
      Toast("error", "Số lượng trong kho không đủ");
      return
    }
    if (!item.product_color || !item.product_size) {
      Toast("error", "Chưa có màu sắc hoặc size");
      return;
    } else {
      const id = await addToCart(item);
      if (auth.data) {
        totalCart([id]);
      } else {
        totalCart([item._id]);
      }
      navigate("/payment");
    }
  };
  const checkNagativeNumber = (number) => {
    if (number < 1) {
      setNumber(1);
    }
    return number;
  };
  const handleLiked = async () => {
    try {
      if (!auth.data) {
        Toast("warn", "Bạn cần phải đăng nhập để thêm vào mục ưa thích");
        return;
      }
      await Users.addToFavorite(auth.data._id, { id: id });
      setLiked(!liked);
      !liked
        ? Toast("success", "Đã thêm sản phẩm vào mục ưa thích")
        : Toast("success", "Đã xóa khỏi mục ưa thích");
    } catch (error) {
      Toast("error", error.message);
    }
  };

  const showStock = () => {
    if (activeColor != undefined && activeSize !== undefined) {
      return <p style={{ marginLeft: "-137px", fontSize: 13 }}>{data?.details?.find(i => i.color == data?.color[activeColor] && i.size == data?.size[activeSize])?.quantity || 0} sp còn lại</p>
    } else return null
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h2>{data?.title}</h2>
      <div className="details-rate">
        <Rate
          disabled
          value={data?.rate}
          style={{ fontSize: 15, marginRight: 10 }}
        />
        <span>({data?.comments?.length} đánh giá của khách hàng)</span>
      </div>
      <div className="details-price">
        {data?.discount > 0 && (
          <h2 className="sale">{Number(data?.price).toLocaleString()}đ</h2>
        )}

        <h2>{Number(data?.priceSale).toLocaleString()}đ</h2>
        <span style={{ fontSize: 15, marginRight: 10 }}>
          ({data?.sales} sản phẩm đã bán)
        </span>
        <div className="icon-details">
          {liked ? (
            <AiFillHeart
              className="icon-detail"
              style={{ color: "red" }}
              onClick={handleLiked}
            />
          ) : (
            <AiOutlineHeart className="icon-detail" onClick={handleLiked} />
          )}

          <AiOutlineShareAlt className="icon-detail" />
          <BsMessenger className="icon-detail mess" />
        </div>
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
                  className={`sizeNumber ${index === activeSize && "activeSize"
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
                  className={`color-btn ${index === activeColor && "activeColor"
                    }`}
                  style={{ backgroundColor: item }}
                  onClick={() => setActiveColor(index)}
                ></div>
              );
            })}
        </div>
        {showStock()}
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
              _id: uuidv4(),
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
        <button
          onClick={() =>
            handleBuyNow({
              user_id: auth.data ? auth?.data._id : "",
              _id: uuidv4(),
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
          className="buy-now"
        >
          MUA NGAY
        </button>
      </div>
    </div>
  );
};

export default Details;
