import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const updateUserData = async (updatedState, userId, dataId) => {
  try {
    console.log(updatedState);
    console.log(userId);
    console.log(dataId);
    const docRef = doc(db, `users/${userId}/userdata`, dataId);
    // const transactionData = {
    //   currBalance: updatedState.currBalance,
    //   incomes: updatedState.incomes,
    //   expenses: updatedState.expenses,
    //   totalIncome: updatedState.totalIncome,
    //   totalExpense: updatedState.totalExpense,
    //   graphData: updatedState.graphData,
    // };
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
