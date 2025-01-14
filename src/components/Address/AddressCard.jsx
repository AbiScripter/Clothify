import { useDispatch } from "react-redux";
import { Button, Popover } from "antd";
import { deleteAddress, defaultAddress } from "../../slices/userSlice";

const AddressCard = ({ address, setIsEditFormModalOpen, setEditId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteAddress(address.id));
  };

  const handleEdit = () => {
    setIsEditFormModalOpen((isOpen) => !isOpen);
    setEditId(() => address.id);
  };

  const handleDelivery = () => {
    dispatch(defaultAddress(address.id));
  };

  return (
    <div
      className="address_card border p-2 flex flex-col gap-1 rounded-md"
      style={{ backgroundColor: `${address.isDefault ? "#F5F5F5" : ""}` }}
    >
      <p className="capitalize">{address.name}</p>
      <p>
        {address.address},{address.city} {address.pincode}
      </p>
      <p>
        {address.city}, {address.state}{" "}
      </p>
      <p>Mobile: {address.mobile}</p>
      <div className="address-card-btns flex gap-2">
        <Button
          size="small"
          onClick={handleDelivery}
          className={address.isDefault ? "default_delivery" : ""}
        >
          {address.isDefault ? "DELIVERING HERE" : "SET DEFAULT ADDRESS "}
        </Button>
        <Popover
          placement="right"
          content={address.isDefault ? "Can't Delete Default Address" : null}
        >
          <Button
            size="small"
            disabled={address.isDefault ? true : false}
            onClick={handleDelete}
            danger
          >
            DELETE
          </Button>
        </Popover>

        <Button size="small" onClick={handleEdit}>
          EDIT
        </Button>
      </div>
    </div>
  );
};

export default AddressCard;
