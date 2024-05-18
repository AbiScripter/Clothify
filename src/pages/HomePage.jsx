import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import {
  MenProducts,
  WomenProducts,
  KidsProducts,
} from "../components/Products/Products";
import "./HomePage.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Layout/Header";
import { initiateStateLogin } from "../slices/accountSlice";
import { setUser } from "../slices/userSlice";

const HomePage = () => {
  const [user, loading] = useAuthState(auth);
  // const currAccount = useSelector((state) => state.account);
  const currUser = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  // const accountCartData = useSelector((state) => state.account.cart);
  // console.log(accountCartData);

  //fetch products data
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const temp = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        temp.push({ id: doc.id, ...doc.data() });
      });
      setData(temp);
    };
    fetchData();
  }, []);
  // console.log(data);

  const menProducts = data.filter((pro) => pro.category === "m");
  const womenProducts = data.filter((pro) => pro.category === "w");
  const kidsProducts = data.filter((pro) => pro.category === "k");

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

  //!fetching user transaction data

  //!  method using onsnapshot
  useEffect(() => {
    let idIfAvailable = "";
    // console.log(user);
    // console.log(currUser);

    if (currUser) {
      idIfAvailable = currUser.uid;
    } else {
      idIfAvailable = user.uid;
    }
    // console.log(idIfAvailable);
    const unsubscribe = onSnapshot(
      query(collection(db, `users/${idIfAvailable}/userdata`)),
      (querySnapshot) => {
        const temp = [];
        querySnapshot.forEach((doc) => {
          temp.push({ id: doc.id, ...doc.data() });
        });
        // console.log(temp);
        // console.log("yes", temp[0]?.id);
        dispatch(initiateStateLogin(temp[0]));
        dispatch(setUser({ ...currUser, dataId: temp[0]?.id }));
      },
      (error) => {
        console.error("Error fetching userData:", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [currUser?.uid]);
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
