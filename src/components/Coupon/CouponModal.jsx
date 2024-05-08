import React, { useState } from "react";
import { Button, Modal, Row, Col } from "antd";
import CouponForm from "./CouponForm";
import "../../pages/CartPage.css";

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
    } else {
      return false;
    }
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
    <div className="coupon_container">
      <Row align="middle">
        <CouponPreview
          couponDiscountPercent={couponDiscountPercent}
          showModal={showModal}
        />
      </Row>
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
    <>
      <Col xs={18}>
        <h3> Coupon Applied STEAL{couponDiscountPercent} </h3>
      </Col>
      <Col xs={6}>
        <Button danger onClick={showModal}>
          EDIT
        </Button>
      </Col>
    </>
  ) : (
    <>
      <Col xs={18}>
        <h3>Apply Coupons </h3>
      </Col>
      <Col xs={6}>
        <Button danger onClick={showModal}>
          APPLY
        </Button>
      </Col>
    </>
  );
};

export default CouponModal;
