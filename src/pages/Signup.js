import React, { useState } from "react";
import SignUpSignIn from "../components/SignupSignin";
import "./SignUp.css";
import { Modal } from "antd";

const Signup = () => {
  const [isSignFormOpen, setIsSignFormOpen] = useState(false);

  const showModal = () => {
    setIsSignFormOpen(true);
  };

  const handleOk = () => {
    setIsSignFormOpen(false);
  };

  const handleCancel = () => {
    setIsSignFormOpen(false);
  };

  return (
    <div className="signup-wrapper">
      <div className="singup-page-container">
        <div className="background-img">
          <h1 className="app-logo">Clothify</h1>
          <button className="shop-btn" onClick={showModal}>
            SHOP NOW
          </button>
          <Modal
            open={isSignFormOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <SignUpSignIn />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Signup;
