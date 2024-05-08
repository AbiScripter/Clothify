import React from "react";
import "./Footer.css";
import playstore from "../asset/play_store.svg";
import appstore from "../asset/app_store.svg";
import { Input, Button } from "antd";

const Footer = () => {
  return (
    <div className="footer">
      <div className="app-section">
        <h3>DOWNLOAD THE APP</h3>
        <img src={playstore} alt="" />
        <img src={appstore} alt="" />
      </div>

      <div>
        <h3>SHOP</h3>
        <p>WOMAN</p>
        <p>MAN</p>
        <p>KIDS</p>
      </div>

      <div>
        <h3>SITES & STORES</h3>
        <p>ABOUT US</p>
        <p>CONTACT US</p>
        <p>STORE LOCATOR</p>
        <p>MEMBERSHIP</p>
      </div>
      <div>
        <h3>JOIN OUR NEWSLETTER</h3>
        <p>Get the latest updates from our stores</p>
        <Input
          placeholder="Email id"
          variant="borderless"
          className="newsletter_email"
        />
        <Button type="primary" className="subscribe_btn">
          SUBSCRIBE
        </Button>
      </div>
    </div>
  );
};

export default Footer;
