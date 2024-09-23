import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice, //includes user's email,name,uid and dataId=>firebase document id which stores all the user data like wishlist etc
  },
  // middleware: [thunk], // middleware automatically added in redux toolkit,so no need to mention. just putting here for reference
});

export default store;
