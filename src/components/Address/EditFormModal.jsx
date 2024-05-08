import React from "react";
import { Modal } from "antd";
import EditForm from "./EditForm";

const EditFormModal = ({
  isEditFormModalOpen,
  setIsEditFormModalOpen,
  editId,
}) => {
  // const showModal = () => {
  //   setIsEditFormModalOpen(true);
  // };

  const handleOk = () => {
    setIsEditFormModalOpen(false);
  };

  const handleCancel = () => {
    setIsEditFormModalOpen(false);
  };

  return (
    <div>
      {/* <Button type="primary" onClick={showModal}>
        Edit
      </Button> */}
      {/* <Button>{userId}</Button> */}
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
          // initalValues={initialValues}
          // userId={userId}
        />
      </Modal>
    </div>
  );
};

export default EditFormModal;
