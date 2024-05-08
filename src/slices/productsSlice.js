import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menProducts: [],
  womenProducts: [],
  kidsProducts: [],
};

const products = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    addToMen: (state, action) => {
      state.wishlist.push({ ...action.payload });
    },

    addToWomen: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (product) => product.id !== action.payload.id
      );
    },

    addToKids: (state, action) => {},
  },
});

export const { addToMen, addToWomen, addToKids } = products.actions;
export default products.reducer;
