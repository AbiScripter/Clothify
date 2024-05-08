function generateRandomId() {
  return Math.random().toString(36).substr(2, 8);
}

export const addAddress = (state, action) => {
  const addressToBeAdded = action.payload.data;
  const addressId = generateRandomId();
  return {
    ...state,
    addressList: {
      ...state.addressList,
      [addressId]: { ...addressToBeAdded, id: addressId, isDefault: false },
    },
  };
};

export const deleteAddress = (state, action) => {
  const addressToBeDeleted = action.payload.data;
  const updatedList = { ...state.addressList };
  delete updatedList[addressToBeDeleted.id];

  return { ...state, addressList: updatedList };
};

export const editAddress = (state, action) => {
  const editedAddress = action.payload.data;
  const oldAddressId = action.payload.data.id; //old address id is the place we have to update our newly editedAddress

  return {
    ...state,
    addressList: {
      ...state.addressList,
      [oldAddressId]: { ...state.addressList[oldAddressId], ...editedAddress },
    },
  };
};

export const defaultAddress = (state, action) => {
  //set the "isDefault" property to false for each address
  const updatedList = { ...state.addressList };
  const addresses = Object.values(updatedList);
  addresses.forEach((address) => {
    address.isDefault = false;
  });

  //set the "isDefault" property  to true for selected address
  const setDefaultId = action.payload.data.id;
  updatedList[setDefaultId].isDefault = true;

  return { ...state, addressList: updatedList };
};
