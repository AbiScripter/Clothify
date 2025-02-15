import { NavLink, useNavigate } from "react-router-dom";
import { Button, Modal, Dropdown } from "antd";
import {
  HeartOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import "./Header.css";
import logo from "../asset/app-logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reset } from "../slices/userSlice";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";

const ConfirmLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      await signOut(auth);
      dispatch(reset());
      // Sign-out successful.
      navigate("/");
      toast.success("signed out");
    } catch (error) {
      // An error happened.
      console.error(error.message);
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleSignOut();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <p
        type="primary"
        className="flex items-center text-base gap-1"
        onClick={showModal}
      >
        <span>
          <LogoutOutlined className="" />
        </span>
        <span className="log-out-text">SignOut</span>
      </p>
      <Modal
        className="confirm-logout-modal"
        title="Confirm Logout"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" danger onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="ok" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <p>Are you sure to log out</p>
      </Modal>
    </div>
  );
};

const Header = () => {
  const user = useSelector((state) => state.user.user); //just for reference

  const items = [
    {
      key: "0",
      disabled: true,
      label: (
        <div className="text-base">
          <p className="text-black capitalize">{user.name}</p>
          <p className="text-black">{user.email}</p>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "1",
      label: (
        <NavLink to="/wishlist" className="navlink">
          <p className="flex gap-1 text-base">
            <span className="">
              <HeartOutlined />
            </span>
            <span>Wishlist</span>
          </p>
        </NavLink>
      ),
    },
    {
      key: "2",
      label: (
        <NavLink to="/cart" className="navlink">
          <p className="flex gap-1 w-60 text-base">
            <span className="">
              <ShoppingOutlined />
            </span>
            <span>Bag</span>
          </p>
        </NavLink>
      ),
    },
    {
      key: "3",
      danger: true,
      label: <ConfirmLogout />,
    },
  ];

  return (
    <div className="px-4 py-2">
      <div className="flex justify-between items-center">
        <div className="left">
          <NavLink to="/home" className="navlink">
            <div className="flex items-center">
              <img src={logo} alt="logo" className="w-10 h-10" />
              <h1
                style={{ fontFamily: "Ultra, serif" }}
                className="hidden sm:block font-bold text-lg ml-1"
              >
                Clothify
              </h1>
            </div>
          </NavLink>
        </div>

        <div
          style={{ fontSize: "1rem" }}
          className="flex gap-8 justify-end items-center"
        >
          <div className="gap-8 hidden sm:flex">
            <NavLink to="/wishlist" className="navlink">
              <p className="flex gap-1 text-lg hover:text-blue-500">
                <span className="hidden sm:block">
                  <HeartOutlined />
                </span>
                <span>Wishlist</span>
              </p>
            </NavLink>
            <NavLink to="/cart" className="navlink">
              <p className="flex gap-1 text-lg hover:text-blue-500">
                <span className="hidden sm:block">
                  <ShoppingOutlined />
                </span>
                <span>Bag</span>
              </p>
            </NavLink>
          </div>

          <div className="">
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
              arrow={
                {
                  // pointAtCenter: true,
                }
              }
            >
              <div>
                <div className="cursor-pointer text-right capitalize flex gap-1 items-center">
                  <p className="text-lg bg-gray-300 rounded-full w-10 h-10 flex justify-center items-center hover:border-blue-500 border-2">
                    {user.name.slice(0, 1)}
                  </p>
                  <CaretDownOutlined />
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
