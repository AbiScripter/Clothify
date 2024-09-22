import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
// import accountSlice from "./slices/accountSlice";

const store = configureStore({
  reducer: {
    // account: accountSlice, //includes user's wishlit,cart,address
    user: userSlice, //includes user's email,name,uid and dataId=>firebase document id which stores all the user data like wishlist etc
  },
  // middleware: [thunk], // middleware automatically added in redux toolkit no need to mention
});

export default store;
