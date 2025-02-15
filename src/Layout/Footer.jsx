import React from "react";
import playstore from "../asset/play_store.svg";
import appstore from "../asset/app_store.svg";
import { Input, Button } from "antd";

const Footer = () => {
  return (
    <div className="footer flex justify-between p-10">
      <div className="app-section">
        <h3 className="mb-2">DOWNLOAD THE APP</h3>
        <div>
          <img src={playstore} alt="" />
          <img src={appstore} alt="" />
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-lg">SHOP</h3>
        <div className="text-sm">
          <p>WOMAN</p>
          <p>MAN</p>
          <p>KIDS</p>
        </div>
      </div>

      <div>
        <h3 className="mb-2">SITES & STORES</h3>
        <div className="text-sm">
          <p>ABOUT US</p>
          <p>CONTACT US</p>
          <p>STORE LOCATOR</p>
          <p>MEMBERSHIP</p>
        </div>
      </div>
      <div>
        <h3 className="mb-2">JOIN OUR NEWSLETTER</h3>
        <div className="text-sm">
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
    </div>
  );
};

export default Footer;
