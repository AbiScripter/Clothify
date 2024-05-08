import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  wishlist: [],
};

const wishlist = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlist.push({ ...action.payload });
    },

    deleteFromWishList: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});

export const { addToWishlist, deleteFromWishList } = wishlist.actions;
export default wishlist.reducer;
