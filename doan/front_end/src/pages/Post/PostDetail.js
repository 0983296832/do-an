import { Avatar, Button, Divider } from "antd";
import moment from "moment";
import React from "react";
import { AiOutlineEye } from "react-icons/ai";

const PostDetail = ({
  data,
  setShowAddPost,
  setContent,
  setTitle,
  setFileList,
  handleRemovePost,
  setCurrentId,
}) => {
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

  const handleEdit = () => {
    setTitle(data.title);
    setContent(data.content);
    setFileList([{ url: data.thumbnail.imageUrl }]);
    setShowAddPost(true);
    setCurrentId(data._id);
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
          <Button type="primary" onClick={handleEdit}>
            Edit Post
          </Button>
          <Button danger onClick={() => handleRemovePost(data._id)}>
            Delete Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
