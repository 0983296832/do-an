import React from "react";
import { Spin } from "antd";

const Loading = () => {
  return (
    <div style={loading}>
      <Spin size="large" />
    </div>
  );
};

export default Loading;

const loading = {
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
