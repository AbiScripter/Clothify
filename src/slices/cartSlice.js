import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const productIndex = state.cart.findIndex(
        (product) => product.id === action.payload.id
      );

      //!if not already exists in the cart
      if (productIndex === -1) {
        state.cart.push({ ...action.payload, quantity: 1 });
      } else {
        state.cart[productIndex].quantity += 1;
      }
    },

    removeFromCart: (state, action) => {
      const productIndex = state.cart.findIndex(
        (product) => product.id === action.payload.id
      );

      //if cart has the product of qty 1 and user decremented that product delete that from the cart
      if (state.cart[productIndex].quantity === 1) {
        state.cart = state.cart.filter(
          (product) => product.id !== action.payload.id
        );
      } else if (state.cart[productIndex].quantity !== 0) {
        state.cart[productIndex].quantity -= 1;
      }
    },

    deleteFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});

export const { addToCart, removeFromCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;

// deleteFromCart: (state, action) => {
//   const addressToBeDeleted = action.payload;
//   state.addressList = state.addressList.filter(
//     (address) => address.id !== addressToBeDeleted
//   );
// },
