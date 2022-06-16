import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Products from "../../services/productServices";
import Toast from "../../components/Toast";

const { TabPane } = Tabs;

const DetailsProduct = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
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
  const [productImages, setProductImages] = useState([
    giay01,
    giay02,
    giay03,
    giay04,
    giay05,
    giay06,
  ]);

  useEffect(() => {
    const getDetail = async () => {
      setLoading(true);
      try {
        const data = await Products.getProductDetails(id);
        await Products.increaseViews(id);
        setProductImages(
          data.data.data.product.image.map((item) => item.imageUrl)
        );
        setDetail({
          id: data.data.data.product._id,
          product_code: data.data.data.product.product_code,
          price: data.data.data.product.price,
          brand: data.data.data.product.brand,
          category: data.data.data.product.category,
          rate: data.data.data.product.votes,
          title: data.data.data.product.name,
          image: data.data.data.product.image[0].imageUrl,
          priceSale:
            data.data.data.product.price *
            ((100 - data.data.data.product.discount) / 100),
          comments: data.data.data.product.comments.length,
          sales: data.data.data.product.sales,
          material: data.data.data.product.material,
          size: [...new Set(data.data.data.product.details.map((i) => i.size))],
          color: [
            ...new Set(data.data.data.product.details.map((i) => i.color)),
          ],
          discount: data.data.data.product.discount,
          stocks: data.data.data.product.details.reduce((acc, item) => {
            return acc + item.quantity;
          }, 0),
        });
      } catch (error) {
        Toast("error", error.message);
      }
      setLoading(false);
    };
    getDetail();
  }, []);
  if (loading) {
    return <Loading />;
  } else
    return (
      <div>
        <div className="details-container">
          <div className="details-left">
            <ProductImagesSlider images={productImages} />
          </div>
          <div className="details-right">
            <Details data={detail} loading={loading} />
          </div>
        </div>
        <div className="details-desc">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Mô tả sản phẩm" key="1">
              <p>- Giày thể thao nam nữ thời trang, cá tính, năng động </p>
              <p>
                - Form: Chuẩn size, lên chân nhẹ nhàng êm ái, kiểu dáng thời
                trang mới nhất Giày dễ phối đồ thích hợp cho các hoạt động, các
                phong cách.{" "}
              </p>
              <p>
                - Chất liệu đế:Cao su lưu hóa nguyên khối có tính đàn hồi, mặt
                đế xẻ rãnh chống trơn trượt{" "}
              </p>
              <p>- Chất liệu mặt giày: tổng hợp nhiều chất liệu cao cấp. </p>
              <p> - Chất liệu mặt trong : Vải khử mùi, kháng khuẩn. </p>
              <p>
                {" "}
                - Lót giày eva êm ái, chốngbí hơi, thoát khí, không tạo mùi dù
                bạn đi liên tục 24/24{" "}
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
