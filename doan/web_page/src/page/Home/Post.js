import React, { useState, useEffect } from "react";
import "../../assets/css/post.css";
import { Avatar, Divider } from "antd";
import Posts from "../../services/postServices";
import Toast from "../../components/Toast";
import { AiOutlineEye } from "react-icons/ai";
import moment from "moment";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const Post = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      const params = {
        limit: 100,
        page: 1,
      };
      const data = await Posts.getPosts(params);
      setData(data.data);
    } catch (error) {
      Toast("error", error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="feedback" style={{ marginBottom: 0 }}>
      <div className="productView-title">
        <h1>Blog Tin Tức</h1>
      </div>
      <Swiper
        navigation={true}
        slidesPerView={3}
        spaceBetween={25}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loopFillGroupWithBlank={false}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <PostItem data={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Post;

const PostItem = ({ data }) => {
  const checkLongContent = (content) => {
    if (content.length > 80) {
      return content.slice(3, 83) + "...";
    }
    return content;
  };
  const checkLongTitle = (content) => {
    if (content.length > 50) {
      return content.slice(0, 50) + "...";
    }
    return content;
  };

  return (
    <div className="post-detail-container">
      <img src={data.thumbnail.imageUrl} alt="" />
      <div className="post-detail-body">
        <h2 className="post-detail-title">{checkLongTitle(data?.title)}</h2>
        <div className="post-detail-info">
          <Avatar src={data.author_image} size={24} />
          <span>by</span>
          <h4>{data.author}</h4>
          <span>
            | {moment(data.created).utc("+07:00").format("MMM DD, yyyy")}
          </span>
        </div>
        <p>{checkLongContent(data.content)}</p>
        <Divider />
        <div className="post-detail-footer">
          <div>
            <AiOutlineEye />
            <h5>{data.views} views</h5>
          </div>
          <Link to={`/post-details/${data._id}`}>Xem thêm</Link>
        </div>
      </div>
    </div>
  );
};
