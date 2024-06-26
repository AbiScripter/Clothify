import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddressCard from "./AddressCard";

import AddAddressFormModal from "./AddAddressFormModal";
import EditFormModal from "./EditFormModal";

const AddressList = () => {
  const list = useSelector((state) => state.account.addressList);
  const [isEditFormModalOpen, setIsEditFormModalOpen] = useState(false);
  const [editId, setEditId] = useState("");
  return (
    <div>
      <h3>Select Delivery Address</h3>
      <h3>Saved Address</h3>
      {list.map((address) => {
        return (
          <AddressCard
            key={address.id}
            address={address}
            isEditFormModalOpen={isEditFormModalOpen}
            setIsEditFormModalOpen={setIsEditFormModalOpen}
            setEditId={setEditId}
          />
        );
      })}
      {/* opens the address form when ADD NEW ADDRESS button clicked */}

      <AddAddressFormModal />
      <EditFormModal
        isEditFormModalOpen={isEditFormModalOpen}
        setIsEditFormModalOpen={setIsEditFormModalOpen}
        editId={editId}
      />
    </div>
  );
};

export default AddressList;
