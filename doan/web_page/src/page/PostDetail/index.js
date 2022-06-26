import React, { useState, useEffect } from "react";
import moment from "moment";
import { Avatar, Tooltip } from "antd";
import { useParams, Link } from "react-router-dom";
import Posts from "../../services/postServices";
import Loading from "../../components/Loading";
import Toast from "../../components/Toast";
import ReactHtmlParser from "react-html-parser";
import Products from "../../services/productServices";
import { BackTop } from "antd";
import { UpCircleOutlined } from "@ant-design/icons";

const PostDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [productHot, setProductHot] = useState([]);

  const getData = async () => {
    const paramsHot = {
      page: 1,
      limit: 10,
      sort: "-sales",
    };
    setLoading(true);
    try {
      const data = await Posts.getPostById(id);
      await Posts.increaseViews(id);
      const {
        data: { data: productHot },
      } = await Products.getProducts(paramsHot);
      setData(data.data);
      setProductHot(
        productHot.map((item) => {
          return {
            id: item._id,
            name: item.name,
            price: item.price,
            priceSale: item.price * ((100 - item.discount) / 100),
            image: item.image[0].imageUrl,
            sale: item.discount > 0,
          };
        })
      );
    } catch (error) {
      Toast("error", error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, [id]);
  const ellipseString = (text) => {
    if (text.length > 30)
      return (
        <Tooltip placement="top" title={text}>
          <h4 style={{ minHeight: 44 }}>{text.substring(0, 30) + "..."}</h4>
        </Tooltip>
      );
    else return <h4 style={{ minHeight: 44 }}>{text}</h4>;
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="cart-container">
      <div className="post-detail-grid">
        <div className="post-detail-left">
          <h1>{data.title}</h1>
          <div className="post-detail-info" style={{ marginBottom: 15 }}>
            Author
            <Avatar src={data.author_image} size={24} />
            <span>by</span>
            <h4>{data.author}</h4>
            <span>
              | {moment(data.created).utc("+07:00").format("MMM DD, yyyy")}
            </span>
          </div>
          <img
            src="https://1sneaker.vn/wp-content/uploads/2021/07/phoi-do-voi-Nike-Air-Jordan-1-Dior.jpg"
            style={{ marginBottom: 30 }}
          />
          {ReactHtmlParser(data.content)}
        </div>
        <div className="post-detail-right">
          <h1>Sản phẩm hot</h1>
          {productHot.map((item, index) => {
            return (
              <Link to={`/product-details/${item.id}`} key={index}>
                <div className="autoComplete-item grid">
                  <img src={item.image} alt="" />
                  <div
                    className="autoComplete-item-info"
                    style={{ maxWidth: "100%", wordWrap: "break-word" }}
                  >
                    <div style={{ maxWidth: "100%", wordWrap: "break-word" }}>
                      {ellipseString(item.name)}
                    </div>

                    <div className="product-price">
                      {item.sale && <h4 className="sale">{item.price}đ</h4>}
                      <h4>{item.priceSale}đ</h4>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          <BackTop>
            <div style={style}>
              <UpCircleOutlined />
            </div>
          </BackTop>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
const style = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: "50%",
  backgroundColor: "#1088e9",
  color: "#fff",
  textAlign: "center",
  fontSize: 25,
};
