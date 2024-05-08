import { createSlice } from "@reduxjs/toolkit";

function generateRandomId() {
  return Math.random().toString(36).substr(2, 8);
}

const initialState = {
  addressList: [
    {
      name: "Abilash",
      mobile: "9178912120",
      pincode: "682016",
      address: "12th cross , MG Road",
      city: "Kochi",
      state: "Kerala",
      id: "2cyuouag",
      isDefault: true,
    },
  ],
  //default address for the inital time
};

const addressSlice = createSlice({
  name: "address",
  initialState: initialState,
  reducers: {
    addAddress: (state, action) => {
      const addressToBeAdded = action.payload;
      state.addressList.push({
        ...addressToBeAdded,
        id: generateRandomId(),
        isDefault: false,
      });
    },

    deleteAddress: (state, action) => {
      const addressToBeDeleted = action.payload;
      state.addressList = state.addressList.filter(
        (address) => address.id !== addressToBeDeleted
      );
    },

    editAddress: (state, action) => {
      const { editedData, id: oldAddressId } = action.payload;
      const addressIndex = state.addressList.findIndex(
        (address) => address.id === oldAddressId
      );

      if (addressIndex !== -1) {
        // Update the existing address object with the new data
        state.addressList[addressIndex] = {
          ...state.addressList[addressIndex], // the existing address object is updated with the new data while preserving any properties that are not provided in the editedData.here the id
          ...editedData,
        };
      }
    },

    defaultAddress: (state, action) => {
      //set the "isDefault" property to false for all address except the selected one
      state.addressList = state.addressList.map((address) =>
        address.id === action.payload
          ? { ...address, isDefault: true }
          : { ...address, isDefault: false }
      );
    },
  },
});

export const { addAddress, deleteAddress, editAddress, defaultAddress } =
  addressSlice.actions;
export default addressSlice.reducer;
