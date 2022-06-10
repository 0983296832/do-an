import React from "react";
import { Divider } from "antd";
import giay from "../../assets/image/giay.jpg";
import giay01 from "../../assets/image/giay01.jpg";
import giay02 from "../../assets/image/giay02.jpg";
import giay03 from "../../assets/image/giay03.jpg";
import giay04 from "../../assets/image/giay04.jpg";
import giay05 from "../../assets/image/giay05.jpg";
import giay06 from "../../assets/image/giay06.jpg";
import ProductImagesSlider from "./ImageSlide";
import "../../assets/css/details.css";
import Details from "./Details";
import SlideProduct from "../../components/SlideProduct";
import { Tabs } from "antd";
import CommentInput from "./Comment";


const { TabPane } = Tabs;

const DetailsProduct = () => {
  const [data, setData] = React.useState([
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: false,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: true,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: true,
      soldOut: true,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: true,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: false,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: true,
      soldOut: true,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: true,
      soldOut: true,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: true,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: true,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: false,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
  ]);
  const [productImages, setProductImages] = React.useState([
    giay01,
    giay02,
    giay03,
    giay04,
    giay05,
    giay06,
  ]);
  return (
    <div>
      <div className="details-container">
        <div className="details-left">
          <ProductImagesSlider images={productImages} />
        </div>
        <div className="details-right">
          <Details />
        </div>
      </div>
      <div className="details-desc">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Mô tả sản phẩm" key="1">
            <p>- Giày thể thao nam nữ thời trang, cá tính, năng động </p>
            <p>
              - Form: Chuẩn size, lên chân nhẹ nhàng êm ái, kiểu dáng thời trang
              mới nhất Giày dễ phối đồ thích hợp cho các hoạt động, các phong
              cách.{" "}
            </p>
            <p>
              - Chất liệu đế:Cao su lưu hóa nguyên khối có tính đàn hồi, mặt đế
              xẻ rãnh chống trơn trượt{" "}
            </p>
            <p>- Chất liệu mặt giày: tổng hợp nhiều chất liệu cao cấp. </p>
            <p> - Chất liệu mặt trong : Vải khử mùi, kháng khuẩn. </p>
            <p>
              {" "}
              - Lót giày eva êm ái, chốngbí hơi, thoát khí, không tạo mùi dù bạn
              đi liên tục 24/24{" "}
            </p>
            <p> - Màu sắc: Trắng, Đen</p>
            <p>- Size: 35-43.</p>
          </TabPane>
          <TabPane tab="Đánh giá của khách hàng" key="2">
            <CommentInput />
          </TabPane>
        </Tabs>
        {/* <h1>Mô tả sản phẩm</h1>
        <Divider /> */}
      </div>

      <div className="more-product">
        <h1>Sản phẩm liên quan</h1>
        <Divider />
        <SlideProduct data={data} />
      </div>
    </div>
  );
};

export default DetailsProduct;
