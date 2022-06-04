import React, { useState } from "react";
import "../../assets/css/feedback.css";
import FeedbackItem from "../../components/FeedbackItem";

const FeedBack = () => {
  const [data, setData] = useState([
    {
      image:
        "https://1sneaker.vn/wp-content/uploads/2021/03/Trang-phuc-bo-sat-unisex-3-100x100.jpg",
      desc: "Giày bên shop có nhiều mẫu đẹp lắm, nhưng mà mình ưu mỗi van cá mập thôi, vừa mới mua bên shop, giày vừa, đẹp, sau ra mua ủng hộ shop tiếp",
      rate: 5,
      name: "Lê Văn Bình",
    },
    {
      image:
        "https://1sneaker.vn/wp-content/uploads/2021/09/Jordan-1-dior-rep-1-1-4_result-100x100.jpg",
      desc: "Em mua đôi converse của shop cách đây 2 days. Rất đẹp ạ. Giao hàng cũng rất nhanh. Mọi người nhớ ghé ủng họ shop nhá. Có dịp em sẽ ghé lại shop!",
      rate: 5,
      name: "Nguyễn Thị Lan Chinh",
    },
    {
      image:
        "https://1sneaker.vn/wp-content/uploads/2021/08/Jordan-1-milan-1-100x100.jpg",
      desc: "Mới mua nên chưa biết độ bền thế nào nhưng giày đẹp, đúng đợt khuyến mãi nên giá rẻ, chủ shop nhiệt tình, shop nhiều quà tặng và ưu đãi.",
      rate: 5,
      name: "Nguyễn Thạch Thảo",
    },
  ]);
  return (
    <div className="feedback">
      <h1>Khách hàng nói gì về chúng tôi</h1>
      <div className="feedback-container">
        {data.map((item, index) => {
          return (
            <div key={index}>
              <FeedbackItem data={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeedBack;
