import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import {
  MenProducts,
  WomenProducts,
  KidsProducts,
} from "../components/Products/Products";
import "./HomePage.css";
// import { useAuthState } from "react-firebase-hooks/auth";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Layout/Header";
import { initiateStateLogin, initiateUserData } from "../slices/accountSlice";
import { initiateUser } from "../slices/userSlice";

const HomePage = () => {
  //!have to know the difference between user and currUser
  // const [user, loading] = useAuthState(auth);
  // const currAccount = useSelector((state) => state.account);
  const currUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [productsData, setProductsData] = useState([]);
  // const accountCartData = useSelector((state) => state.account.cart);
  // console.log(accountCartData);

  //!fetch default products data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsCollectionRef = collection(db, "products");
        const querySnapshot = await getDocs(productsCollectionRef);
        const temp = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          temp.push({ id: doc.id, ...doc.data() });
        });
        setProductsData(temp);
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

  //!fetching user data(wishlit,cart etc)
  //!  method using onsnapshot(real time data fetching)
  useEffect(() => {
    const userId = currUser?.uid;

    if (!userId) {
      console.warn("No user ID available to fetch data.");
      return;
    }

    // Query the user's data collection
    const userCollectionRef = collection(db, `users/${userId}/userdata`);

    const unsubscribe = onSnapshot(
      userCollectionRef,
      (querySnapshot) => {
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push({ id: doc.id, ...doc.data() });
        });

        //we are getting data from collection so that will be an array, so getting the first index will be the user data
        //  dispatch actions with the first item
        const firstUserData = userData[0];
        // console.log(firstUserData);
        if (firstUserData) {
          dispatch(initiateUserData(firstUserData));
          dispatch(initiateUser({ ...currUser, dataId: firstUserData.id }));
        } else {
          console.warn("No user data found in the collection.");
        }
      },
      (error) => {
        console.error("Error fetching user data:", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [currUser?.uid, dispatch]);

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
