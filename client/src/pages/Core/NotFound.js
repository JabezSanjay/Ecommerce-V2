import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import Navbar from "../../Layout/Navbar";

const NotFound = () => {
  return (
    <>
      {" "}
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Link to="/">
              <Button type="primary">Back Home</Button>
            </Link>
          }
        />
      </div>
    </>
  );
};

export default NotFound;
