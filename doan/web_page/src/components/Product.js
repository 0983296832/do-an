import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Rate } from "antd";
import { BsEye, BsCartPlus } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import Toast from "./Toast";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { AiFillHeart } from "react-icons/ai";

const Product = ({ data, like }) => {
  const { addToCart } = useContext(CartContext);
  const { auth } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const [activeSize, setActiveSize] = useState();
  const [activeColor, setActiveColor] = useState();

  // const handleAddToCart = (data) => {
  //   if (!data.product_size || !data.product_color) {
  //     Toast("error", "Chưa có màu sắc hoặc size");
  //     return;
  //   }
  //   if (data?.stocks == 0) {
  //     Toast("error", "Sản phẩm đã hết hàng");
  //     return;
  //   }

  //   if (
  //     data?.details?.find(
  //       (i) =>
  //         i.color == data?.color[activeColor] &&
  //         i.size == data?.size[activeSize]
  //     )?.quantity < 1 ||
  //     data?.details?.find(
  //       (i) =>
  //         i.color == data?.color[activeColor] &&
  //         i.size == data?.size[activeSize]
  //     )?.quantity == undefined
  //   ) {
  //     Toast("error", "Số lượng trong kho không đủ");
  //     return;
  //   }
  //   addToCart(item);
  //   setDisabled(false);
  //   setActiveSize(null);
  //   setActiveColor(null);
  // };
  const ellipseString = (text) => {
    if (text.length > 50) return text.substring(0, 50) + "...";
    else return text;
  };
  return (
    <div className="product-container">
      <div className="product-img">
        <Swiper
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          // modules={[Autoplay]}
        >
          {data.image.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item.imageUrl} alt="Product" />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <img src={data.image[0].imageUrl} alt="Product" /> */}
        <Link to={`/product-details/${data.id}`}>
          <div className="product-cart-icon">
            <BsEye />
          </div>
        </Link>
        {data.sale && <div className="product-sale">SALE</div>}
        {/* {data.sale && <div className="product-sale">SALE{data.discount}%</div>} */}
        {data.stocks == 0 && <div className="product-soldOut">Cháy Hàng</div>}
        <div
          className="product-addToCart"
          onClick={() => {
            setDisabled(true);
          }}
        >
          <BsCartPlus />
        </div>
        {/* <div className={`product-addToCart-menu ${disabled ? "" : "disabled"}`}>
          <div className="addToCart-menu-info">
            <div className="addToCart-menu-close">
              <GrFormClose onClick={() => setDisabled(false)} />
            </div>
            <div className="addToCart-menu-size">
              <h4>Size:</h4>
              <div>
                {data?.size &&
                  data?.size
                    .sort((a, b) => a - b)
                    .map((item, index) => {
                      return (
                        <h5
                          key={index}
                          onClick={() => setActiveSize(index)}
                          style={{
                            textDecoration: index === activeSize && "underline",
                          }}
                        >
                          {item}
                        </h5>
                      );
                    })}
              </div>
            </div>
            <div className="addToCart-menu-size">
              <h4>Color:</h4>
              <div>
                {data.color &&
                  data?.color.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`color-btn ${
                          index === activeColor && "activeColor"
                        }`}
                        style={{ backgroundColor: item, width: 15, height: 15 }}
                        onClick={() => setActiveColor(index)}
                      ></div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div
            className="addToCart-menu-icon"
            onClick={() =>
              handleAddToCart({
                user_id: auth.data ? auth?.data._id : "",
                product_id: data.id,
                product_code: data?.product_code,
                product_name: data?.title,
                product_price: data?.priceSale,
                product_image: data?.image[0].imageUrl,
                product_quantity: 1,
                product_size: data?.size[activeSize],
                product_color: data?.color[activeColor],
                product_brand: data?.brand,
                product_category: data?.category,
              })
            }
          >
            <BsCartPlus /> <h5>Thêm vào giỏ hàng</h5>
          </div>
        </div> */}
      </div>
      <Link to={`/product-details/${data.id}`}>
        <div className="product-infor" style={{ minHeight: 150 }}>
          <h4 style={{ minHeight: 44 }}>{ellipseString(data.title)}</h4>

          <h3>
            {data.brand}
            {/* {data?.gender} */}
          </h3>
          <div className="product-rate">
            <Rate disabled defaultValue={data.rate} />
          </div>
          <div className="product-price">
            {data.sale && (
              <h4 className="sale">{data.price.toLocaleString()}đ</h4>
            )}
            <h4>{data.priceSale.toLocaleString()}đ</h4>
          </div>
          {like && (
            <AiFillHeart
              className="icon-product-like"
              style={{ color: "red", fontSize: 20 }}
            />
          )}
        </div>
      </Link>
    </div>
  );
};

export default Product;
