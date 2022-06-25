import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "antd";
import PostDetail from "./PostDetail";
import "../../assets/css/post.css";
import AddPost from "./AddPost";
import AuthContext from "../../context/AuthContext";
import Posts from "../../services/postServices";
import Toast from "../../components/Toast";
import BasicPagination from "../../components/Pagination";

const Post = () => {
  const { auth } = useContext(AuthContext);
  const [showAddPost, setShowAddPost] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const handleOk = async () => {
    try {
      const body = {
        title: title,
        author: auth.data.name,
        author_image: auth.data.image,
        content: content,
      };
      const { data } = await Posts.createPosts(body);
      if (fileList.length !== 0) {
        const formData = new FormData();
        formData.append("image", fileList[0].originFileObj);
        await Posts.uploadImage(data._id, formData);
      }
      Toast("success", "Add new post successfully");
    } catch (error) {
      Toast("error", error.message);
    }
    setShowAddPost(false);
  };
  const getData = async () => {
    setLoading(true);
    try {
      const params = {
        limit: 6,
        page: 1,
      };
      const data = await Posts.getPosts(params);
      setData(data.data);
      setPageCount(Math.ceil(data.count / 6));
    } catch (error) {
      Toast("error", error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="main-wrapper">
      <div className="datatableTitle">
        Posts Management
        <Button onClick={() => setShowAddPost(true)}>Add New</Button>
        <Modal
          title="Add new post"
          visible={showAddPost}
          onOk={handleOk}
          onCancel={() => setShowAddPost(false)}
          style={{ minWidth: 1000 }}
        >
          <AddPost
            title={title}
            setTitle={setTitle}
            fileList={fileList}
            setFileList={setFileList}
            content={content}
            setContent={setContent}
          />
        </Modal>
      </div>
      <div className="post-list">
        {data.map((item, index) => {
          return (
            <div key={index}>
              <PostDetail data={item} setShowAddPost={setShowAddPost} />
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BasicPagination page={page} setPage={setPage} count={pageCount} />
      </div>
    </div>
  );
};

export default Post;
