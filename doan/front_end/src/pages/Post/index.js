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
  const [currentId, setCurrentId] = useState("");

  const handleOk = async (id) => {
    try {
      const body = {
        title: title,
        author: auth.data.name,
        author_image: auth.data.image,
        content: content,
      };
      let dataReturn;
      if (id) {
        dataReturn = await Posts.updatePost(id, body);
        Toast("success", "Update post successfully");
      } else {
        dataReturn = await Posts.createPosts(body);
        Toast("success", "Add post successfully");
      }
      let newUrl;
      if (!fileList[0].url) {
        if (fileList.length !== 0) {
          const formData = new FormData();
          formData.append("image", fileList[0].originFileObj);
          newUrl = await Posts.uploadImage(dataReturn.data._id, formData);
        }
      }
      window.location.reload();
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
  const handleAddNewPost = () => {
    setShowAddPost(true);
    setTitle("");
    setContent("");
    setFileList([]);
    setCurrentId("");
  };
  const handleRemovePost = async (id) => {
    try {
      await Posts.deletePost(id);
      setData(data.filter((item) => item._id !== id));
      Toast("success", "Delete post successfully");
    } catch (error) {
      Toast("error", error.message);
    }
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
        <Button onClick={handleAddNewPost}>Add New</Button>
        <Modal
          title="Add new post"
          visible={showAddPost}
          footer={null}
          onCancel={() => {
            setShowAddPost(true);
            setTitle("");
            setContent("");
            setShowAddPost(false);
          }}
          style={{ minWidth: 1000 }}
        >
          <AddPost
            title={title}
            setTitle={setTitle}
            fileList={fileList}
            setFileList={setFileList}
            content={content}
            setContent={setContent}
            handleOk={handleOk}
            currentId={currentId}
          />
        </Modal>
      </div>
      <div className="post-list">
        {data.map((item, index) => {
          return (
            <div key={index}>
              <PostDetail
                data={item}
                setShowAddPost={setShowAddPost}
                title={title}
                setTitle={setTitle}
                fileList={fileList}
                setFileList={setFileList}
                content={content}
                setContent={setContent}
                handleRemovePost={handleRemovePost}
                setCurrentId={setCurrentId}
              />
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
