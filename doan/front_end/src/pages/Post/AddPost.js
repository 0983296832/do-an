import React, { useContext } from "react";
import { Input, Avatar } from "antd";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ImgUpload from "../../components/ImageUpload";
import AuthContext from "../../context/AuthContext";
import moment from "moment";

const AddPost = ({
  content,
  setContent,
  title,
  setTitle,
  fileList,
  setFileList,
  data,
}) => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="main-wrapper add-post-wrapper">
      <div className="add-post-info">
        <Avatar
          src={data ? data.author_image : auth.data.image}
          size={50}
          style={{ border: "1px solid #000" }}
        />
        <div>
          <h3>{data ? data.author : auth.data.name}</h3>
          <h5>
            {moment(data ? data.created : Date.now())
              .utc("+07:00")
              .format("MMM DD, yyyy")}
          </h5>
        </div>
      </div>
      <div className="post-input">
        <h2>Title</h2>
        <Input
          placeholder="Your post title"
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="post-input">
        <h2>Thumbnails</h2>
        <ImgUpload length={1} fileList={fileList} setFileList={setFileList} />
      </div>
      <div className="post-input">
        <h2>Content</h2>
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />
      </div>
    </div>
  );
};

export default AddPost;
