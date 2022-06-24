import React from "react";
import { Link } from "react-router-dom";
import PostDetail from "./PostDetail";
import "../../assets/css/post.css";

const Post = () => {
  return (
    <div className="main-wrapper">
      <div className="datatableTitle">
        Posts Management
        <Link to="/add-post" className="_link">
          Add New
        </Link>
      </div>
      <div className="post-list">
        <PostDetail />
        <PostDetail />
        <PostDetail />
        <PostDetail />
        <PostDetail />
      </div>
    </div>
  );
};

export default Post;
