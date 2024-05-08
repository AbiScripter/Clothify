import React, { useState } from "react";
// import Header from "../components/Header";
import SignUpSignIn from "../components/SignupSignin";
import "./SignUp.css";
import { Button, Modal } from "antd";
// import imageFilename from "../asset/stock-photo-seasonal-sales-concept-happy-middle-eastern-family-of-three-jumping-with-shopping-bags-over-yellow-1994413244-transformed.jpeg";
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
    <>
      <div className="singup-page-container">
        <div className="background-img">
          <h1 className="app-logo">LOOK VIBE</h1>
          <Button className="shop-btn" onClick={showModal}>
            SHOP NOW
          </Button>
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
    </>
  );
};

export default Signup;
