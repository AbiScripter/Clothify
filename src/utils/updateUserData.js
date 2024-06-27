import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const updateUserData = async (updatedState, userId, dataId) => {
  try {
    const docRef = doc(db, `users/${userId}/userdata`, dataId);
    const userData = {
      cart: updatedState.cart,
      wishlist: updatedState.wishlist,
      addressList: updatedState.addressList,
    };

    await updateDoc(docRef, userData);
  } catch (error) {
    console.error("Error updating userData:", error);
  }
};

export default updateUserData;
