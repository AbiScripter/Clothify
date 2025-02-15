import React, { useState } from "react";
import { Button, Card, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import signInUser from "../../utils/signInUtils";
import GoogleLoginForm from "./GoogleLoginForm";

const SignInForm = ({ setIsSignInTab }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleFormSubmit(formdata) {
    const user = await signInUser(formdata, setIsLoading);
    //if signin is success it will return userdata
    //if signin fails it returns null
    if (user !== null) {
      navigate("/home");
    }
  }

  return (
    <Card className="signin-form-container p-3">
      <h2 className="text-xl mb-4">Hi, Welcome Back 👋</h2>
      <Form
        onFinish={handleFormSubmit}
        form={form}
        // variant="filled"
        style={{ maxWidth: 600 }}
        layout="vertical"
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input placeholder="Enter Your Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Enter Your Password" />
        </Form.Item>

        <Button
          type="primary"
          block
          htmlType="submit"
          loading={isLoading}
          disabled={isLoading}
        >
          Login
        </Button>
        <p className="my-3">
          Don't have an acoount ?&nbsp;
          <span
            className="text-blue-400 underline font-bold cursor-pointer"
            onClick={() => setIsSignInTab((prev) => !prev)}
          >
            Sign Up
          </span>
        </p>
        <GoogleLoginForm />
      </Form>
    </Card>
  );
};

export default SignInForm;
