import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import { auth } from "../../firebase";
import { signInAnonymously } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import createGuestDoc from "../../utils/guestLogin";
import { Button } from "antd";

const SignUpSignIn = () => {
  const [isSignInTab, setIsSignInTab] = useState(false);

  return (
    <div className="form-containers">
      {!isSignInTab ? (
        <>
          <SignUpForm setIsSignInTab={setIsSignInTab} />
          <GuestLogin />
        </>
      ) : (
        <>
          <SignInForm setIsSignInTab={setIsSignInTab} />
          <GuestLogin />
        </>
      )}
    </div>
  );
};

const GuestLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const continueAsGuest = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signInAnonymously(auth);
      console.log("Guest user signed in:", userCredential.user);
      await createGuestDoc(userCredential.user, "guest");
      navigate("/home");
      // Proceed to the application with the guest user
    } catch (error) {
      console.error("Error signing in as guest:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <Button
        loading={isLoading}
        className="bg-green-700 hover:bg-green-600 w-full py-1 rounded-md text-white"
        onClick={() => continueAsGuest()}
      >
        Continue as guest
      </Button>
    </div>
  );
};

export default SignUpSignIn;
