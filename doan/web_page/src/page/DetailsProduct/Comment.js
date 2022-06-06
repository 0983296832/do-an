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
const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => (
      <Comment
        {...props}
        datetime={
          <div>
            <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
              <span>{moment().fromNow()}</span>
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
    )}
  />
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

const CommentInput = () => {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [rate, setRate] = useState(0);

  const handleSubmit = () => {
    if (!comment && !author) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setComment("");
      setAuthor("");
      setRate(0);
      setComments([
        ...comments,
        {
          author: author,
          rate: rate,
          avatar: "https://joeschmoe.io/api/v1/random",
          content: <p>{comment}</p>,
          datetime: moment().fromNow(),
        },
      ]);
    }, 1000);
  };

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
      {comments.length > 0 && <CommentList comments={comments} />}
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
    </>
  );
};

export default CommentInput;
