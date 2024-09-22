import { createSlice } from "@reduxjs/toolkit";
import updateUserData from "../utils/updateUserData";
const initialState = {
  user: {
    name: "",
    email: "",
    uid: "",
    cart: [],
    wishlist: [],
    addressList: [],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initiateUser: (state, action) => {
      state.user = action.payload;
    },

    clearUser: (state) => {
      state.user = initialState.user;
    },

    reset: (state) => {
      state.user = initialState.user;
    },

    //!Cart Reducers
    addToCart: (state, action) => {
      const productData = action.payload;

      const productIndex = state.user.cart.findIndex(
        (product) => product.id === productData.id
      );

      //if not already exists in the cart
      if (productIndex === -1) {
        state.user.cart.push({ ...productData, quantity: 1 });
      } else {
        state.user.cart[productIndex].quantity += 1;
      }

      updateUserData(state.user);
    },

    //subtract from cart by 1
    removeFromCart: (state, action) => {
      const productData = action.payload;

      const productIndex = state.user.cart.findIndex(
        (product) => product.id === productData.id
      );

      //if cart has the product of qty 1 and user decremented that product delete that from the cart
      if (state.user.cart[productIndex].quantity === 1) {
        state.user.cart = state.user.cart.filter(
          (product) => product.id !== productData.id
        );
      } else if (state.user.cart[productIndex].quantity !== 0) {
        state.user.cart[productIndex].quantity -= 1;
      }

      updateUserData(state.user);
    },

    //delete from cart entirely
    deleteFromCart: (state, action) => {
      const productData = action.payload;
      console.log(productData);
      state.user.cart = state.user.cart.filter(
        (product) => product.id !== productData.id
      );

      updateUserData(state.user);
    },

    //!Wihslist reducers
    addToWishlist: (state, action) => {
      const productData = action.payload;
      console.log(productData);
      state.user.wishlist = [...state.user.wishlist, productData];
      updateUserData(state.user);
    },

    deleteFromWishList: (state, action) => {
      const productData = action.payload;
      state.user.wishlist = state.user.wishlist.filter(
        (product) => product.id !== productData.id
      );
      updateUserData(state.user);
    },

    //!Address reducers
    addAddress: (state, action) => {
      const addressToBeAdded = action.payload;
      state.user.addressList = [
        ...state.user.addressList,
        {
          ...addressToBeAdded,
          id: crypto.randomUUID(),
          isDefault: state.user.addressList.length === 0 ? true : false, //the first address which is added will be the default address , so set that to be default address
        },
      ];
      updateUserData(state.user);
    },

    deleteAddress: (state, action) => {
      const addressToBeDeleted = action.payload;
      state.user.addressList = state.user.addressList.filter(
        (address) => address.id !== addressToBeDeleted
      );
      updateUserData(state.user);
    },

    editAddress: (state, action) => {
      const { editedData, id: oldAddressId } = action.payload;

      const addressIndex = state.user.addressList.findIndex(
        (address) => address.id === oldAddressId
      );

      if (addressIndex !== -1) {
        // Update the existing address object with the new data
        state.user.addressList[addressIndex] = {
          ...state.user.addressList[addressIndex], // the existing address object is updated with the new data while preserving any properties that are not provided in the editedData
          ...editedData,
        };
      }

      updateUserData(state.user);
    },

    defaultAddress: (state, action) => {
      const addressToDefaultId = action.payload;
      //set the "isDefault" property to false for all address except the selected one
      state.user.addressList = state.user.addressList.map((address) =>
        address.id === addressToDefaultId
          ? { ...address, isDefault: true }
          : { ...address, isDefault: false }
      );
      updateUserData(state.user);
    },
  },
});

export const {
  initiateUser,
  clearUser,
  addToCart,
  removeFromCart,
  deleteFromCart,
  addToWishlist,
  deleteFromWishList,
  addAddress,
  deleteAddress,
  editAddress,
  defaultAddress,
  reset,
} = userSlice.actions;
export default userSlice.reducer;
