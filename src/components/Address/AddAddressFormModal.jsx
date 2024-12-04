import React, { useState } from "react";
import { Button, Modal } from "antd";
import AddAddressForm from "./AddAddressForm";

const AddAddressFormModal = () => {
  const [isAddressFormModalOpen, setIsAddressFormModalOpen] = useState(false);

  const showModal = () => {
    setIsAddressFormModalOpen(true);
  };

  const handleOk = () => {
    setIsAddressFormModalOpen(false);
  };

  const handleCancel = () => {
    setIsAddressFormModalOpen(false);
  };

  return (
    <>
      <Button
        className="add-address-btn"
        block
        danger
        type="primary"
        onClick={showModal}
      >
        ADD NEW ADDRESS
      </Button>
      <Modal
        title="Add Address"
        open={isAddressFormModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <AddAddressForm setIsAddressFormModalOpen={setIsAddressFormModalOpen} />
      </Modal>
    </>
  );
};

export default AddAddressFormModal;
