import React from "react";
import { Form, Input, Button } from "antd";
import User from "../../services/userServices";
import Toast from "../../components/Toast";

const ChangePasswordForm = ({ id }) => {
  const onFinish = async (values) => {
    delete values.confirm_password;
    try {
      await User.changePassword(id, values);
      Toast("success", "change password successfully!");
    } catch (error) {
      Toast("error", "Old password incorrect");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 30,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete={+false}
    >
      <Form.Item
        label=" Mật khẩu cũ"
        name="old_password"
        rules={[
          {
            required: true,
            message: "Please input your old password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mật khẩu Mới"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm_password"
        label="Nhập lại mật khẩu mới"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePasswordForm;
