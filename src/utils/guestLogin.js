import { db, doc, setDoc } from "../firebase";
import { toast } from "react-toastify";

const defaultUserData = {
  name: "guest",
  email: "guest@gmail.com",
  uid: "",
  cart: [],
  wishlist: [],
  addressList: [],
};

async function createGuestDoc(signupData) {
  try {
    await setDoc(doc(db, "users", signupData.uid), {
      ...defaultUserData,
      uid: signupData.uid,
    });

    toast.success("Logged in as guest");
  } catch (error) {
    toast.error(error.message);
  }
}

export default createGuestDoc;
