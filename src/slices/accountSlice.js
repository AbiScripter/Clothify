import { createSlice } from "@reduxjs/toolkit";
import updateUserData from "../utils/updateUserData";

const initialState = {
  cart: [],
  wishlist: [],
  addressList: [
    // {
    //   name: "Abilash",
    //   mobile: "9178912120",
    //   pincode: "682016",
    //   address: "12th cross , MG Road",
    //   city: "Kochi",
    //   state: "Kerala",
    //   id: "2cyuouag",
    //   isDefault: true,
    // },
  ],
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    //!Cart Reducers
    addToCart: (state, action) => {
      const productIndex = state.cart.findIndex(
        (product) => product.id === action.payload.data.id
      );

      //if not already exists in the cart
      if (productIndex === -1) {
        state.cart.push({ ...action.payload.data, quantity: 1 });
      } else {
        state.cart[productIndex].quantity += 1;
      }
      console.log(action.payload);

      updateUserData(state, action.payload.userId, action.payload.dataId);
    },

    removeFromCart: (state, action) => {
      const productIndex = state.cart.findIndex(
        (product) => product.id === action.payload.data.id
      );

      //if cart has the product of qty 1 and user decremented that product delete that from the cart
      if (state.cart[productIndex].quantity === 1) {
        state.cart = state.cart.filter(
          (product) => product.id !== action.payload.data.id
        );
      } else if (state.cart[productIndex].quantity !== 0) {
        state.cart[productIndex].quantity -= 1;
      }

      updateUserData(state, action.payload.userId, action.payload.dataId);
    },

    deleteFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload.data.id
      );

      updateUserData(state, action.payload.userId, action.payload.dataId);
    },

    //!Wihslist reducers

    addToWishlist: (state, action) => {
      state.wishlist.push({ ...action.payload.data });

      updateUserData(state, action.payload.userId, action.payload.dataId);
    },

    deleteFromWishList: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (product) => product.id !== action.payload.data.id
      );

      updateUserData(state, action.payload.userId, action.payload.dataId);
    },

    //!Address reducers
    addAddress: (state, action) => {
      const addressToBeAdded = action.payload.data;
      state.addressList.push({
        ...addressToBeAdded,
        id: generateRandomId(),
        isDefault: state.addressList.length === 0 ? true : false, //for the first address which is to add set that to be default address
      });
      updateUserData(state, action.payload.userId, action.payload.dataId);
    },

    deleteAddress: (state, action) => {
      const addressToBeDeleted = action.payload.data;
      state.addressList = state.addressList.filter(
        (address) => address.id !== addressToBeDeleted
      );
      updateUserData(state, action.payload.userId, action.payload.dataId);
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

      updateUserData(state, action.payload.userId, action.payload.dataId);
    },

    defaultAddress: (state, action) => {
      const addressToDefault = action.payload.data;
      //set the "isDefault" property to false for all address except the selected one
      state.addressList = state.addressList.map((address) =>
        address.id === addressToDefault
          ? { ...address, isDefault: true }
          : { ...address, isDefault: false }
      );
      updateUserData(state, action.payload.userId, action.payload.dataId);
    },

    initiateStateLogin: (state, action) => {
      if (action.payload !== undefined) {
        console.log("from redux state", action.payload);
        return action.payload;
      }
      return state;
    },

    reset: () => initialState,
  },
});

function generateRandomId() {
  return Math.random().toString(36).substr(2, 8);
}

export const {
  addToCart,
  removeFromCart,
  deleteFromCart,
  addToWishlist,
  deleteFromWishList,
  addAddress,
  deleteAddress,
  editAddress,
  defaultAddress,
  initiateStateLogin,
  reset,
} = accountSlice.actions;
export default accountSlice.reducer;
