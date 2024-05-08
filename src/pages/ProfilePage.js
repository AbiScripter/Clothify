import React from "react";
import { useSelector } from "react-redux";
import Header from "../Layout/Header";
import AddressFormModal from "../components/Address/AddressFormModal";
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
        <p>Name {user.name}</p>
        <p>Email ID {user.email}</p>
        <AddressList />
        {/* <AddressFormModal /> */}
      </div>
    </>
  );
};

export default ProfilePage;
