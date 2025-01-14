import React, { useState } from "react";
import { Button, Modal } from "antd";
import CouponForm from "./CouponForm";

function stillValid(total, percent) {
  console.log(total, percent);
  if (percent > 0) {
    if (total < 999) return false;

    if (percent === 10 && total >= 999) {
      return true;
    }

    if (percent === 25 && total >= 1799) {
      return true;
    }

    if (percent === 50 && total >= 4999) {
      return true;
    }

    return false;
  }

  return true;
}

const CouponModal = ({
  total,
  setCouponDiscountPercent,
  couponDiscountPercent,
}) => {
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  //!check already applied coupon still valid for the current total
  if (!stillValid(total, couponDiscountPercent)) {
    alert(
      "The current Total will fall below the threshold for the applied coupon. The coupon has been reset."
    );
    setCouponDiscountPercent(0);
  }

  const showModal = () => {
    setIsCouponModalOpen(true);
  };

  // const handleOk = () => {
  //   setIsCouponModalOpen(false);
  // };

  const handleCancel = () => {
    setIsCouponModalOpen(false);
  };

  return (
    <div className="coupon_container pb-6 border-b">
      <div align="middle">
        <CouponPreview
          couponDiscountPercent={couponDiscountPercent}
          showModal={showModal}
        />
      </div>

      <Modal
        open={isCouponModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <CouponForm
          total={total}
          setCouponDiscountPercent={setCouponDiscountPercent}
          setIsCouponModalOpen={setIsCouponModalOpen}
        />
      </Modal>
    </div>
  );
};

const CouponPreview = ({ couponDiscountPercent, showModal }) => {
  return couponDiscountPercent ? (
    <div className="flex justify-center gap-8 items-center">
      <h3>
        Coupon Applied
        <span className="font-bold"> STEAL{couponDiscountPercent}</span>
      </h3>
      <Button type="primary" onClick={showModal}>
        EDIT
      </Button>
    </div>
  ) : (
    <div className="flex justify-center gap-4 items-center">
      <h3>Apply Coupons </h3>
      <Button type="primary" onClick={showModal}>
        APPLY
      </Button>
    </div>
  );
};

export default CouponModal;
