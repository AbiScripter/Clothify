import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddressCard from "./AddressCard";

import AddAddressFormModal from "./AddAddressFormModal";
import EditFormModal from "./EditFormModal";

const AddressList = () => {
  const addressList = useSelector((state) => state.user.user.addressList);
  const [isEditFormModalOpen, setIsEditFormModalOpen] = useState(false);
  const [editId, setEditId] = useState("");
  return (
    <div>
      <h3 className="font-bold">Select Delivery Address</h3>
      <h3 className="font-semibold mt-4 mb-1">Saved Address</h3>
      <div className="flex flex-col gap-4">
        {addressList.map((address) => {
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
      </div>

      {/* opens the address form when ADD NEW ADDRESS button clicked */}

      <div className="mt-2">
        <AddAddressFormModal />
      </div>
      <EditFormModal
        isEditFormModalOpen={isEditFormModalOpen}
        setIsEditFormModalOpen={setIsEditFormModalOpen}
        editId={editId}
      />
    </div>
  );
};

export default AddressList;
