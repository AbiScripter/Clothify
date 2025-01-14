import React, { useState } from "react";
import { Button, Modal, Card } from "antd";
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
      <div className="flex items-center justify-center gap-4">
        <p className="">Add Address To place order</p>

        {/*address form modal  */}

        <AddAddressFormModal />
      </div>
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
    <div className="">
      {/* address preview on the cart page */}
      <Card className="address_preview">
        <div className="flex flex-col xs:flex-row justify-center items-center gap-3 xs:gap-8">
          <div>
            <AddressPreview defaultAddress={defaultAddress} />
          </div>

          <div>
            {/* button to show  modal which displays list of address */}
            <Button danger onClick={showModal}>
              {!defaultAddress ? "Set Default Address" : "CHANGE ADDRESS"}
            </Button>
          </div>
        </div>
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
      <p className="capitalize">Deliver to : {rest.name}</p>
      <p>
        {rest.address}, {rest.city} {rest.pincode}.
      </p>
    </div>
  );
};

export default Address;
