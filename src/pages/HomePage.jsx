import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  MenProducts,
  WomenProducts,
  KidsProducts,
} from "../components/Products/Products";
import "./HomePage.css";
// import { useAuthState } from "react-firebase-hooks/auth";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import Header from "../Layout/Header";

const HomePage = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);

  const [productsData, setProductsData] = useState([]);

  //!fetch default products data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsCollectionRef = collection(db, "products");
        const querySnapshot = await getDocs(productsCollectionRef);

        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductsData(products);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const menProducts = productsData.filter((pro) => pro.category === "m");
  const womenProducts = productsData.filter((pro) => pro.category === "w");
  const kidsProducts = productsData.filter((pro) => pro.category === "k");

  //!products
  //!for ANTD TABS
  const items = [
    {
      key: "1",
      label: "Men",
      children: <MenProducts list={menProducts} />,
    },
    {
      key: "2",
      label: "Women",
      children: <WomenProducts list={womenProducts} />,
    },
    {
      key: "3",
      label: "Kids",
      children: <KidsProducts list={kidsProducts} />,
    },
  ];

  // ?Previous used when there is a subcollection data, now its not used [just for reference purpose]
  //!fetching user data(wishlit,cart etc)of that specific user if they already logged or not
  //!method using onsnapshot(real time data fetching)
  // useEffect(() => {
  //   const userUId = user?.uid;

  //   // Early return if no user ID
  //   if (!userUId) {
  //     console.warn("No user ID available to fetch data.");
  //     return;
  //   }

  //   //we only have UId when someone signup(check App.js), so to get dataId which points to userData which contains cart, wishlist and addresslist. we have to use UId and get userData using this reference
  //   const userCollectionRef = collection(db, `users/${userUId}/userdata`);

  //   // Handle snapshot updates
  //   const handleSnapshot = (querySnapshot) => {
  //     const userData = querySnapshot.docs.map((doc) => ({
  //       dataId: doc.id, //userDataId which we need
  //       ...doc.data(),
  //     }));

  //     //we are getting data from collection so that will be an array, so getting the first index will be the user data
  //     const firstUserData = userData[0];
  //     console.log({ ...firstUserData });
  //     if (firstUserData) {
  //       // dispatch(initiateUserData(firstUserData)); //if the user already signed up and have wishlist or cart items, it should load when they log in (this action takes care of that)

  //       dispatch(initiateUser({ ...user, ...firstUserData })); //setting the dataId (initially it was empty)
  //     } else {
  //       console.warn("No user data found in the collection.");
  //     }
  //   };

  //   // Real-time Firestore listener
  //   const unsubscribe = onSnapshot(
  //     userCollectionRef,
  //     handleSnapshot,
  //     (error) => {
  //       console.error("Error fetching user data:", error);
  //     }
  //   );

  //   // Clean up the listener on unmount
  //   return () => unsubscribe();
  // }, [user?.uid, dispatch]);

  return (
    <>
      <Header />
      <div className="home-page">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </>
  );
};

export default HomePage;
