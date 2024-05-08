import { NavLink, useNavigate } from "react-router-dom";
import { Row, Col, Button } from "antd";
import {
  HeartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Header.css";
import logo from "../asset/myntra-logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { reset } from "../slices/accountSlice";
import ProfilePage from "../pages/ProfilePage";

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
        <Col span={18} className="left">
          <NavLink to="/home" className="navlink">
            <img src={logo} alt="logo" className="logo" />
          </NavLink>
        </Col>

        <Col span={6} className="right">
          <NavLink to="/wishlist" className="navlink">
            <span>
              <HeartOutlined />
              &nbsp;Wishlist
            </span>
          </NavLink>
          <NavLink to="/cart" className="navlink">
            <span>
              <ShoppingOutlined />
              &nbsp;Bag
            </span>
          </NavLink>
          <NavLink to="/profile" className="navlink">
            <span>
              <UserOutlined />
              &nbsp;Profile
            </span>
          </NavLink>
          <Button className="sign-out-btn" onClick={handleSignOut}>
            SignOut
          </Button>
        </Col>
        {/* <Col span={1}>
          
        </Col>
        <Col span={1}>

        </Col>
        <Col span={2}>
 
        </Col> */}
      </Row>
    </div>
  );
};

export default Header;
