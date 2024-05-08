import { configureStore } from "@reduxjs/toolkit";

// import addressSlice from "./slices/addressSlice";
// import cartSlice from "./slices/cartSlice";
// import wishlistSlice from "./slices/wishlistSlice";
// import productsSlice from "./slices/productsSlice";

import userSlice from "./slices/userSlice";
import accountSlice from "./slices/accountSlice";
const store = configureStore({
  reducer: {
    // products: productsSlice,
    account: accountSlice,
    user: userSlice,
    // address: addressSlice,
    // cart: cartSlice,
    // wishlist: wishlistSlice,
  },
  // middleware: [thunk], // middleware automatically added in redux toolkit no need to mention
});

export default store;
