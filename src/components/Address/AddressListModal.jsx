import React, { useState } from "react";
import { Button, Modal, Card, Col, Row } from "antd";
import AddressList from "./AddressList";
import { useSelector } from "react-redux";
import "../../pages/CartPage.css";
import AddressFormModal from "./AddressFormModal";

const AddressModal = () => {
  const [isAddressListModalOpen, setIsAddressListModalOpen] = useState(false);

  // Find the address marked as default
  const addressList = useSelector((state) => state.account.addressList);
  let defaultAddress = null;
  if (addressList.length === 0) {
    return (
      <>
        <p>Add Address To place order</p>
        <AddressFormModal />
      </>
    );
  }

  addressList.forEach((address) => {
    if (address.isDefault) {
      defaultAddress = address;
    }
  });

  console.log(defaultAddress);

  const showModal = () => {
    setIsAddressListModalOpen(true);
  };

  const handleOk = () => {
    setIsAddressListModalOpen(false);
  };

  const handleCancel = () => {
    setIsAddressListModalOpen(false);
  };

  return (
    <div>
      <Card className="address_preview">
        <Row justify="center" align="middle">
          <Col span={16}>
            <AddressPreview defaultAddress={defaultAddress} />
          </Col>
          <Col span={8}>
            <Button danger onClick={showModal}>
              {!defaultAddress ? "Set Default Address" : " CHANGE ADDRESS"}
            </Button>
          </Col>
        </Row>
      </Card>
      <Modal
        open={isAddressListModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <AddressList />
      </Modal>
    </div>
  );
};

const AddressPreview = ({ defaultAddress }) => {
  let { ...rest } = defaultAddress || {};
  return (
    <div>
      <p>
        <span>
          Deliver to: {rest.name}, {rest.pincode}
        </span>
        <br />
        <span>
          {rest.address}, {rest.city} {rest.pincode}.
        </span>
      </p>
    </div>
  );
};

export default AddressModal;
