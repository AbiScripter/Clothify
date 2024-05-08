import React, { useState } from "react";
import { Button, Modal } from "antd";
import AddressForm from "./AddressForm";

const AddressFormModal = () => {
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
      <Button block danger type="primary" onClick={showModal}>
        ADD NEW ADDRESS
      </Button>
      <Modal
        title="Add Address"
        open={isAddressFormModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <AddressForm setIsAddressFormModalOpen={setIsAddressFormModalOpen} />
      </Modal>
    </>
  );
};

export default AddressFormModal;
