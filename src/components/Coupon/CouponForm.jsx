import React from "react";
import { Button, Form, Radio, Popover } from "antd";

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
    <Form form={form} variant="filled" onFinish={handleFormSubmit}>
      <h3 className="font-bold text-lg">Available Coupons</h3>
      <h4 className="font-semibold">Total Amount: ₹{total}</h4>
      <Form.Item name="radio-group" className="mt-4">
        <Radio.Group>
          <div className="">
            <CustomRadio
              price={999}
              offerPercentage={10}
              checkEligible={checkEligible}
            />
          </div>

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

      <Button type="primary" block htmlType="submit" className="-mt-2">
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
      className="custom-radio mb-6"
    >
      <Popover
        placement="right"
        content={checkEligible(price, "popover")}
        className=""
      >
        <div className="border p-2 w-[20rem] rounded-md">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-lg">STEAL{offerPercentage}</h1>
            <p className="font-semibold">
              {offerPercentage}% off on order above ₹{price}
            </p>
          </div>
        </div>
      </Popover>
    </Radio>
  );
};

export default CouponForm;
