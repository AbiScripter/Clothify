import React from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { editAddress } from "../../slices/accountSlice";

const EditForm = ({ setIsEditFormModalOpen, editId }) => {
  const addressList = useSelector((state) => state.account.addressList);
  const currUser = useSelector((state) => state.user.user);
  const formPrefill = addressList[editId];
  const [form] = Form.useForm(); //for form resetting
  const dispatch = useDispatch();

  const handleFormUpdate = (editedData) => {
    console.log("editttedData", editedData);

    dispatch(
      editAddress({
        editedData: editedData,
        id: editId,
        userId: currUser.uid,
        dataId: currUser.dataId,
      })
    );

    form.resetFields(); //reset the form
    setIsEditFormModalOpen((isModalOpen) => !isModalOpen); //close the form modal after submitting
  };

  return (
    <Form
      form={form}
      variant="filled"
      style={{ maxWidth: 600 }}
      onFinish={handleFormUpdate}
      initialValues={{ ...formPrefill }}
      // initialValues={initalValues}
    >
      <h3>Contact Details</h3>
      <Form.Item
        label="Input"
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

      <h3>Address</h3>
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
      {/* <Form.Item
        label={editId}
        name="id"
        rules={[{ required: true, message: "editId*" }]}
      >
        <Input />
      </Form.Item> */}
      <Button type="primary" block htmlType="submit">
        UPDATE ADDRESS
      </Button>
    </Form>
  );
};

export default EditForm;
