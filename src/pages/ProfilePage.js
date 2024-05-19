import React from "react";
import { useSelector } from "react-redux";
import Header from "../Layout/Header";
import AddressList from "../components/Address/AddressList";
import "./ProfilePage.css";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const userAccount = useSelector((state) => state.account);
  console.log(user);
  console.log(userAccount);
  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="user-details">
          <p>{user.name.charAt(0).toUpperCase() + user.name.slice(1)}</p>
          <p>{user.email}</p>
        </div>
        <AddressList />
      </div>
    </>
  );
};

export default ProfilePage;
