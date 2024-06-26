import React from "react";
import { Modal } from "antd";
import EditForm from "./EditForm";

const EditFormModal = ({
  isEditFormModalOpen,
  setIsEditFormModalOpen,
  editId,
}) => {
  const handleOk = () => {
    setIsEditFormModalOpen(false);
  };

  const handleCancel = () => {
    setIsEditFormModalOpen(false);
  };

  return (
    <div>
      <Modal
        title="Edit Address"
        open={isEditFormModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <EditForm
          setIsEditFormModalOpen={setIsEditFormModalOpen}
          editId={editId}
        />
      </Modal>
    </div>
  );
};

export default EditFormModal;
