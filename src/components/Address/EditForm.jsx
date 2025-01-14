import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { editAddress } from "../../slices/userSlice";

const EditForm = ({ setIsEditFormModalOpen, editId }) => {
  console.log(editId);
  const addressList = useSelector((state) => state.user.user.addressList);

  const [form] = Form.useForm(); //for form resetting
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch the address that matches the editformId
    const formPrefill = addressList.find((address) => address.id === editId);

    // Update form fields if formPrefill exists
    if (formPrefill) {
      form.setFieldsValue({
        name: formPrefill.name,
        mobile: formPrefill.mobile,
        pincode: formPrefill.pincode,
        address: formPrefill.address,
        city: formPrefill.city,
        state: formPrefill.state,
      });
    }
  }, [editId, addressList, form]);

  const handleFormUpdate = (editedData) => {
    // console.log("editttedData", editedData);
    // console.log(user);
    dispatch(
      editAddress({
        editedData: editedData,
        id: editId,
      })
    );

    setIsEditFormModalOpen((isModalOpen) => !isModalOpen); //close the form modal after submitting
  };

  return (
    <Form
      form={form}
      variant="filled"
      style={{ maxWidth: 600 }}
      onFinish={handleFormUpdate}
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
      <Button type="primary" block htmlType="submit">
        UPDATE ADDRESS
      </Button>
    </Form>
  );
};

export default EditForm;
