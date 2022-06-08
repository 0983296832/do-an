import React from "react";
import "../assets/css/footer.css";
import delivery from "../assets/image/delivery.png";
import payment from "../assets/image/payment.png";
import advisory from "../assets/image/advisory.png";
import fashion from "../assets/image/fashion.png";
import sneakerLogo from "../assets/image/1Sneaker-Logo.png";
import { ImLocation } from "react-icons/im";
import { BsPhone } from "react-icons/bs";
import { Divider } from "antd";
import giaohang from "../assets/image/dv-giaohang.png";
import { useLocation } from "react-router-dom";

const Footer = () => {
  let location = useLocation();
  const data = [
    {
      img: delivery,
      title: "Free Ship",
      desc: "Free ship hóa đơn trên 1 triệu",
    },
    {
      img: payment,
      title: "Thanh Toán",
      desc: "Kiểm Hàng Rồi Thanh Toán.",
    },
    {
      img: advisory,
      title: "Hỗ Trợ Tư Vấn",
      desc: "Đội ngũ hỗ trợ tư vấn nhiệt tình.",
    },
    {
      img: fashion,
      title: "Mẫu Mã",
      desc: "Luôn cập mật các mẫu mã mới.",
    },
  ];
  const dataInfo = [
    {
      title: "DỊCH VỤ KHÁCH HÀNG",
      child: [
        "Hướng dẫn mua hàng",
        "Cách Chọn Size Giày",
        "Vận Chuyển Hàng",
        "Đổi Trả",
        "Phàn Nàn/Góp Ý",
        "Chọn Mẫu Ưng Ý",
      ],
    },
    {
      title: "THÔNG TIN",
      child: [
        "Về 1Sneaker",
        "Bảo Mật Thông Tin",
        "Tài Khoản",
        "Sản Phẩm Yêu Thích",
        "Feedback",
        "Mua Sỉ",
      ],
    },
    {
      title: "SẢN PHẨM ƯA THÍCH",
      child: [
        "Giày Sneaker",
        "Giày Nike",
        "Giày Adidas",
        "Giày New Balance",
        "Giày Converse",
        "Giày Vans",
      ],
    },
    {
      title: "ĐƠN VỊ VẬN CHUYỂN",
      img: giaohang,
    },
  ];
  if (location.pathname === "/login"|| location.pathname === "/register") {
    return null;
  }
  return (
    <div className="footer-container">
      <div className="footer-top">
        {data.map((item, index) => {
          return (
            <div className="footer-item" key={index}>
              <img src={item.img} alt="" />
              <div className="footer-item-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
      <Divider />
      <div className="footer-bottom">
        <div className="footer-bottom-item">
          <img src={sneakerLogo} alt="" style={{ marginBottom: 60 }} />
          <h2>Địa Chỉ Cửa Hàng:</h2>
          <p>
            <ImLocation />
            CN 1: 85/6 Đ. Số 51, Phường 14, Gò Vấp, HCM (Tạm Thời Đóng Cửa) GIAO
            HÀNG HCM TẦM 3 ĐẾN 5 NGÀY
          </p>
          <p>
            <ImLocation />
            CN 2: Gần trường thpt phú xuyên A, Phú Xuyên Hà Nội
          </p>

          <p>
            <BsPhone />
            Phone: ( 08 ) 250 420 93
          </p>
        </div>
        {dataInfo.map((item, index) => {
          return (
            <div className="footer-bottom-item" key={index}>
              <h3>{item.title}</h3>
              {item.child ? (
                item.child.map((itemChild, indexChild) => {
                  return <p key={indexChild}>{itemChild}</p>;
                })
              ) : (
                <img src={item.img} alt="" style={{ width: 200 }} />
              )}
            </div>
          );
        })}
      </div>
      <Divider />
      <div className="footer-coppy">
        @2022: 1Sneaker.vn. 1SNEAKER Chuyên thời trang đường phố REPLICA 1:1
      </div>
    </div>
  );
};

export default Footer;
