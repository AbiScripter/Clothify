import React from "react";
import { Spin } from "antd";

const SuspenseLoader = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Spin />
    </div>
  );
};

export default SuspenseLoader;
