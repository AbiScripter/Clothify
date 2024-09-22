import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const updateUserData = async (updatedUserState) => {
  const docRef = doc(db, "users", updatedUserState.uid);

  try {
    await updateDoc(docRef, updatedUserState);
  } catch (error) {
    console.error("Error updating userData:", error);
  }
};

export default updateUserData;
