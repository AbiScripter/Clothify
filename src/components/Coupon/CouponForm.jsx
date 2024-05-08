import React from "react";
import { Button, Form, Radio, Card, Popover } from "antd";

const CouponForm = ({
  total,
  setCouponDiscountPercent,
  setIsCouponModalOpen,
}) => {
  const [form] = Form.useForm(); //for form resetting

  const handleFormSubmit = (data) => {
    console.log(data);
    if (!data["radio-group"]) {
      alert("Coupon Not Applied");
      return;
    }
    setCouponDiscountPercent(data["radio-group"]);
    setIsCouponModalOpen((isModalOpen) => !isModalOpen); //close the form modal after submitting
  };

  const checkEligible = (offer, type) => {
    let returnVal = null;
    if (type === "radio") {
      if (total < offer) {
        returnVal = true;
      } else {
        returnVal = false;
      }
    } else if (type === "popover") {
      if (total < offer) {
        returnVal = "Not Eligible";
      } else {
        returnVal = "Eligible";
      }
    }
    return returnVal;
  };

  return (
    <Form
      form={form}
      variant="filled"
      style={{ maxWidth: 600 }}
      onFinish={handleFormSubmit}
    >
      <h3>Available Coupons</h3>
      <h4>Total Amount: {total}</h4>
      <Form.Item name="radio-group">
        <Radio.Group>
          <CustomRadio
            price={999}
            offerPercentage={10}
            checkEligible={checkEligible}
          />
          <CustomRadio
            price={1799}
            offerPercentage={25}
            checkEligible={checkEligible}
          />
          <CustomRadio
            price={4999}
            offerPercentage={50}
            checkEligible={checkEligible}
          />
        </Radio.Group>
      </Form.Item>

      <Button type="primary" block htmlType="submit">
        APPLY
      </Button>
    </Form>
  );
};

const CustomRadio = ({ price, offerPercentage, checkEligible }) => {
  return (
    <Radio
      value={offerPercentage}
      disabled={checkEligible(price, "radio")}
      className="custom-radio"
    >
      <Popover placement="right" content={checkEligible(price, "popover")}>
        <Card className="offer-card" style={{ width: 300 }}>
          <Button>STEAL{offerPercentage}</Button>
          <p>
            {offerPercentage}% off on order above Rs. {price}
          </p>
        </Card>
      </Popover>
    </Radio>
  );
};

export default CouponForm;
