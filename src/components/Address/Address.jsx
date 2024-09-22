import React, { useState } from "react";
import { Button, Modal, Card, Col, Row } from "antd";
import AddressList from "./AddressList";
import { useSelector } from "react-redux";
import AddAddressFormModal from "./AddAddressFormModal";

const Address = () => {
  const [isAddressListModalOpen, setIsAddressListModalOpen] = useState(false);
  const addressList = useSelector((state) => state.user.user.addressList);
  let defaultAddress = null;

  //if there is no addresss added
  if (addressList.length === 0) {
    return (
      <>
        <p>Add Address To place order</p>
        {/*address form modal  */}
        <AddAddressFormModal />
      </>
    );
  }

  // Find the address marked as default
  addressList.forEach((address) => {
    if (address.isDefault) {
      defaultAddress = address;
    }
  });

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
      {/* address preview on the cart page */}
      <Card className="address_preview">
        <Row justify="center" align="middle">
          <Col xs={24} sm={14} lg={16}>
            <AddressPreview defaultAddress={defaultAddress} />
          </Col>

          <Col xs={24} sm={10} lg={8}>
            {/* button to show  modal which displays list of address */}
            <Button danger onClick={showModal}>
              {!defaultAddress ? "Set Default Address" : " CHANGE ADDRESS"}
            </Button>
          </Col>
        </Row>
      </Card>

      {/* modal to display list of  address => displays only a button which opens a modal */}
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

export default Address;
