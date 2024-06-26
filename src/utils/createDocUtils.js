import { getDoc, collection, addDoc } from "firebase/firestore";
import { db, doc, setDoc } from "../firebase";
import { toast } from "react-toastify";

async function createDoc(user, username, userAccountData) {
  console.log(user);
  console.log(userAccountData);
  //getting userdata
  const userRef = doc(db, "users", user.uid);
  //if user signing up there wont be any userData
  const userData = await getDoc(userRef);
  //only create doc if userdata don't already exists in database
  //else dont create doc
  //!signUP
  if (!userData.exists()) {
    console.log("first time signing up........");
    try {
      const currTimeStamp = user.metadata.createdAt;
      const createdAt = new Date(Number(currTimeStamp));

      //initializing user info like name,mail in firebase with data got from signup and signin methods(user)
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName ? user.displayName : username,
        email: user.email,
        photoURl: user.photoURL ? user.photoURL : "",
        createdAt: createdAt,
      });

      //initializing user account data like wishlist,address and cart items in firebase with data from redux inital state(userAccountData)
      const subcollectionRef = collection(userRef, "userdata");
      await addDoc(subcollectionRef, {
        ...userAccountData,
      });

      toast.success("Account sucessfully created");
    } catch (error) {
      toast.error(error.message);
    }
  } else {
    //!google sign in
    console.log("Account Aleardy exists.....");
    toast.success("Logged In Successfully");
  }
}

export default createDoc;
