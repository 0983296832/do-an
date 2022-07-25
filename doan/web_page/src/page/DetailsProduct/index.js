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
import ReactHtmlParser from "react-html-parser";

const { TabPane } = Tabs;

const DetailsProduct = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [moreProduct, setMoreProduct] = useState([]);
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
        const params = {
          page: 1,
          limit: 11,
          "product_code[regex]": data.data.data.product.brand,
        };
        const moreProduct = await Products.getProducts(params);
        setMoreProduct(
          moreProduct.data.data
            .map((item) => {
              return {
                id: item._id,
                title: item.name,
                product_code: item.product_code,
                image: item.image,
                price: item.price,
                category: item.category,
                rate: item.votes || 0,
                sale: item.discount > 0,
                discount: item.discount,
                priceSale: item.price * ((100 - item.discount) / 100),
                size: [...new Set(item.details.map((i) => i.size))],
                color: [...new Set(item.details.map((i) => i.color))],
                brand: item.brand,
                category: item.category,
                stocks: item.details.reduce((acc, item) => {
                  return acc + item.quantity;
                }, 0),
                desc: item.desc,
              };
            })
            .filter((i) => i.id !== id)
        );
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
          comments: data.data.data.product.comments
            .map((item) => {
              return {
                id: item._id,
                avatar: "https://joeschmoe.io/api/v1/random",
                content: item.content,
                rate: item.vote,
                author: item.name,
                datetime: item.created,
              };
            })
            .sort((a, b) => new Date(b.datetime) - new Date(a.datetime)),
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
          desc: data.data.data.product.desc,
        });
      } catch (error) {
        Toast("error", error.message);
      }
      setLoading(false);
    };
    getDetail();
  }, [id]);
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
            <Details data={detail} loading={loading} id={id} />
          </div>
        </div>
        <div className="details-desc">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Mô tả sản phẩm" key="1">
              {ReactHtmlParser(detail.desc)}
            </TabPane>
            <TabPane tab="Đánh giá của khách hàng" key="2">
              <CommentInput id={id} setDetail={setDetail} detail={detail} />
            </TabPane>
          </Tabs>
        </div>

        <div className="more-product">
          <h1>Sản phẩm liên quan</h1>
          <Divider />
          <SlideProduct data={moreProduct} />
        </div>
      </div>
    );
};

export default DetailsProduct;
