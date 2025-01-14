import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Card } from "antd";
import signUpUser from "../../utils/signUpUtils";
import createDoc from "../../utils/createDocUtils";
// import { useSelector } from "react-redux";
import GoogleLoginForm from "./GoogleLoginForm";

const SignUpForm = ({ setIsSignInTab }) => {
  // const userData = useSelector((state) => state.user.user);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function handleFormSubmit(formData) {
    const singupData = await signUpUser(formData, setIsLoading);

    //if signup is success it will return userdata
    //if signup fails it returns null
    if (singupData !== null) {
      createDoc(singupData, formData.username);
      navigate("/home");
    }
  }

  return (
    <>
      <Card className="">
        <h2 className="text-xl mb-4">Create an account</h2>

        <Form
          layout="vertical"
          className="signup-form"
          onFinish={handleFormSubmit}
          form={form}
          // variant="filled"
          style={{ maxWidth: 400 }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter Your Username" />
          </Form.Item>

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

          <Form.Item
            name="confirm"
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
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Your Password" />
          </Form.Item>

          <Button
            type="primary"
            block
            htmlType="submit"
            loading={isLoading}
            disabled={isLoading}
          >
            Sign Up
          </Button>

          <p className="my-3">
            Already have an account ?&nbsp;
            <span
              className="text-blue-400 underline font-bold cursor-pointer"
              onClick={() => setIsSignInTab((prev) => !prev)}
            >
              Login
            </span>
          </p>
          <GoogleLoginForm />
        </Form>
      </Card>
    </>
  );
};

export default SignUpForm;
