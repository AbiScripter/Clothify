import { NavLink, useNavigate } from "react-router-dom";
import { Row, Col, Button, Modal } from "antd";
import {
  HeartOutlined,
  ShoppingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./Header.css";
import logo from "../asset/logoo.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { reset } from "../slices/userSlice";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";

const Header = () => {
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

  return (
    <div>
      <Row className="nav" align="middle">
        <Col xs={12} sm={6} md={10} lg={12} xl={16} className="left">
          <NavLink to="/home" className="navlink">
            <div className="logo-container">
              <img src={logo} alt="logo" className="logo" />
              <p className="logo-text">Clothify</p>
            </div>
          </NavLink>
        </Col>

        <Col xs={12} sm={18} md={14} lg={12} xl={8} className="right">
          <NavLink to="/wishlist" className="navlink">
            <span className="link-span">
              <HeartOutlined />
              <span>&nbsp;Wishlist</span>
            </span>
          </NavLink>
          <NavLink to="/cart" className="navlink">
            <span className="link-span">
              <ShoppingOutlined />
              <span>&nbsp;Bag</span>
            </span>
          </NavLink>
          <NavLink to="/profile" className="navlink">
            <span className="link-span">
              <UserOutlined />
              <span>&nbsp;Profile</span>
            </span>
          </NavLink>
          <ConfirmLogout handleSignOut={handleSignOut} />
        </Col>
      </Row>
    </div>
  );
};

const ConfirmLogout = ({ handleSignOut }) => {
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
    <>
      <Button type="primary" className="sign-out-btn" onClick={showModal}>
        <span className="log-out-text">SignOut</span>
        <LogoutOutlined className="log-out-icon" />
      </Button>
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
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <p>Are you sure to log out</p>
      </Modal>
    </>
  );
};

export default Header;
