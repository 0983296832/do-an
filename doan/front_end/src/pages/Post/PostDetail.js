import { Avatar, Button, Divider } from "antd";
import React from "react";
import { AiOutlineEye } from "react-icons/ai";

const PostDetail = () => {
  const checkLongContent = (content) => {
    if (content.length > 90) {
      return content.slice(0, 90) + "...";
    }
    return content;
  };
  return (
    <div className="post-detail-container">
      <img
        src="https://1sneaker.vn/wp-content/uploads/2020/08/Cach-giat-giay-the-thao-bang-Baking-Soda-va-Giam.jpg"
        alt=""
      />
      <div className="post-detail-body">
        <h2 className="post-detail-title">
          Hướng dẫn cách giặt giày thể thao trắng và nhanh khô
        </h2>
        <div className="post-detail-info">
          <Avatar src="https://joeschmoe.io/api/v1/random" size={24} />
          <span>by</span>
          <h4>Thanh Bình</h4>
          <span>|18 July 2015</span>
        </div>
        <p>
          {checkLongContent(
            " Lorem Ipsum is simply dummy text of the printing and typesettingindustry. Lorem Ipsum has been the industry's standard dummy text eversince the 1500s, when an unknown printer took a galley of type andscrambled it to make a type specimen book."
          )}
        </p>
        <Divider />
        <div className="post-detail-footer">
          <div>
            <AiOutlineEye />
            <h5>120 views</h5>
          </div>
          <Button type="primary">Edit Post</Button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
