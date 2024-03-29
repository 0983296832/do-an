import React, { useState } from "react";
import {
  Comment,
  Avatar,
  Form,
  Button,
  List,
  Input,
  Rate,
  Tooltip,
} from "antd";
import moment from "moment";
import Product from "../../services/productServices";
import Toast from "../../components/Toast";
const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <div
    id="scrollableDiv"
    style={{
      height: 400,
      overflow: "auto",
      padding: "0 16px",
      border: "1px solid rgba(140, 140, 140, 0.35)",
    }}
  >
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
      itemLayout="horizontal"
      renderItem={(props) => {
        return (
          <Comment
            {...props}
            datetime={
              <div>
                <Tooltip
                  title={moment(props.datetime).format("YYYY-MM-DD HH:mm:ss")}
                >
                  <span>{moment(props.datetime).fromNow()}</span>
                </Tooltip>
                <Rate
                  allowHalf
                  defaultValue={props.rate}
                  disabled
                  style={{ marginLeft: 10, fontSize: 12 }}
                />
              </div>
            }
          />
        );
      }}
    />
  </div>
);

const Editor = ({
  onChangeComment,
  onChangeAuthor,
  onChangeRate,
  onSubmit,
  submitting,
  comment,
  author,
  rate,
}) => (
  <>
    <Form.Item>
      <Rate allowHalf defaultValue={rate} onChange={onChangeRate} />
    </Form.Item>
    <Form.Item>
      <Input
        placeholder="Tên khách hàng"
        style={{ maxWidth: 200 }}
        onChange={onChangeAuthor}
        value={author}
      />
    </Form.Item>
    <Form.Item>
      <TextArea
        rows={4}
        onChange={onChangeComment}
        value={comment}
        placeholder="Viết bình luận..."
      />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const CommentInput = ({ id, setDetail, detail }) => {
  const [comments, setComments] = useState(detail?.comments);
  const [submitting, setSubmitting] = useState(false);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [rate, setRate] = useState(0);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      if (!comment && !author) return;

      const newComment = {
        name: author,
        vote: rate,
        content: comment,
      };
      await Product.comment(id, newComment);
      let rates = detail.rate;
      if (detail.rate == 0) {
        rates = Math.round((detail.rate + rate) / 0.5) * 0.5;
      } else {
        rates = Math.round((detail.rate + rate) / 2 / 0.5) * 0.5;
      }

      setDetail({
        ...detail,
        comments: [...detail.comments, { ...newComment, datetime: Date.now() }],
        rate: rates,
      });


      setComments([
        {
          author: author,
          rate: rate,
          avatar: "https://joeschmoe.io/api/v1/random",
          content: <p>{comment}</p>,
          datetime: Date.now(),
        },
        ...comments,
      ]);
      setComment("");
      setAuthor("");
      setRate(0);
      setSubmitting(false);
      Toast("success", "Bình luận thành công");
    } catch (error) {
      setSubmitting(false);
      Toast("error", error.message);
    }
  };
  // console.log(detail)
  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };
  const handleChangeAuthor = (e) => {
    setAuthor(e.target.value);
  };
  const handleChangeRate = (value) => {
    setRate(value);
  };

  return (
    <>
      <Comment
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <Editor
            onChangeComment={handleChangeComment}
            onChangeAuthor={handleChangeAuthor}
            onChangeRate={handleChangeRate}
            onSubmit={handleSubmit}
            submitting={submitting}
            comment={comment}
            name={author}
            rate={rate}
          />
        }
      />
      {comments.length > 0 && <CommentList comments={comments} />}
    </>
  );
};

export default CommentInput;
