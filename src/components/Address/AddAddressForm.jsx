import React from "react";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { addAddress } from "../../slices/userSlice";

const AddAddressForm = ({ setIsAddressFormModalOpen }) => {
  const [form] = Form.useForm(); //for form resetting ANTD only
  const dispatch = useDispatch();

  const handleFormSubmit = (addressData) => {
    dispatch(addAddress(addressData));

    form.resetFields(); //reset the form
    setIsAddressFormModalOpen((isModalOpen) => !isModalOpen); //close the form modal after submitting
  };

  return (
    <Form
      form={form}
      variant="filled"
      style={{ maxWidth: 600 }}
      onFinish={handleFormSubmit}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Name*" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mobile No"
        name="mobile"
        rules={[{ required: true, message: "Mobile No*" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="pincode"
        name="pincode"
        rules={[{ required: true, message: "Pincode*" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="address"
        name="address"
        rules={[{ required: true, message: "Address*" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="city/town"
        name="city"
        rules={[{ required: true, message: "City*" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="state"
        name="state"
        rules={[{ required: true, message: "State*" }]}
      >
        <Input />
      </Form.Item>

      <Button type="primary" s block htmlType="submit">
        SUBMIT
      </Button>
    </Form>
  );
};

export default AddAddressForm;
