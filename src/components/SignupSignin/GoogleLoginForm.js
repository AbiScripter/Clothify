import { Button } from "antd";
import React, { useState } from "react";
import googleSignIn from "../../utils/googleSignIn";
import { useSelector } from "react-redux";
import createDoc from "../../utils/createDocUtils";
import { useNavigate } from "react-router-dom";

const GoogleLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const account = useSelector((state) => state.account);
  const navigate = useNavigate();

  async function handleGoogleSignIn() {
    const googleData = await googleSignIn(setIsLoading);
    if (googleData) {
      console.log(googleData);
      createDoc(googleData.user, googleData.user.displayName, account);
      navigate("/home");
    }
  }

  return (
    <Button
      type="primary"
      block
      onClick={handleGoogleSignIn}
      loading={isLoading}
    >
      Login with Google
    </Button>
  );
};

export default GoogleLoginForm;
