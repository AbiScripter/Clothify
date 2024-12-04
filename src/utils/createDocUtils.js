import { getDoc } from "firebase/firestore";
import { db, doc, setDoc } from "../firebase";
import { toast } from "react-toastify";

const defaultUserData = {
  name: "",
  email: "",
  uid: "",
  cart: [],
  wishlist: [],
  addressList: [],
};

async function createDoc(signupData, username) {
  // console.log(userAccountData);
  console.log(signupData);

  const userRef = doc(db, "users", signupData.uid);

  //if user signing up there wont be any userData
  const userData = await getDoc(userRef);
  //so create a doc only if userdata don't already exists in database
  //!signup
  if (!userData.exists()) {
    // console.log("first time signing up........");
    try {
      //initializing user info like name,mail in firebase with data got from signup and signin methods and combine with defaultUserData which is same as redux initial state
      await setDoc(doc(db, "users", signupData.uid), {
        ...defaultUserData,
        name: signupData.displayName ? signupData.displayName : username,
        email: signupData.email,
        uid: signupData.uid,
      });

      //?previously used when subcollection is used(just for reference)
      //initializing user account data like wishlist,address and cart items in firebase with data from redux inital state(user)
      // const subcollectionRef = collection(userRef, "userdata");
      // await addDoc(subcollectionRef, {
      //   ...userAccountData,
      // });

      toast.success("Account sucessfully created");
    } catch (error) {
      toast.error(error.message);
    }
  } else {
    //!signin
    // console.log("Account Aleardy exists.....");
    toast.success("Logged In Successfully");
  }
}

export default createDoc;
