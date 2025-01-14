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
    <div className="bg-black">
      <div className="singup-page-container">
        <div
          // style={{ backgroundImage: `url("/asset/form-back.png")` }}
          className="background-img h-screen bg-center bg-cover"
        >
          <div className="flex flex-col gap-4 p-6">
            <h1 className="text-5xl" style={{ fontFamily: "Ultra, serif" }}>
              Clothify
            </h1>
            <button
              className="shop-btn w-60 border border-black cursor-pointer p-2 hover:bg-black hover:text-orange-400"
              onClick={showModal}
            >
              SHOP NOW
            </button>
          </div>

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
