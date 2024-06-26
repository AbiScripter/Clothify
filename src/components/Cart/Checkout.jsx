import React from "react";
import { Button, Col, Popover, Row } from "antd";
import { useSelector } from "react-redux";
import useRazorpay from "react-razorpay";

const CheckoutSummary = ({ list, total, couponDiscountPercent }) => {
  const platformFee = 20;
  let shippingCost = 0;
  let finalTotal = 0;
  const couponDiscount = Math.floor((couponDiscountPercent / 100) * total);
  const AddressList = useSelector((state) => state.account.addressList);
  const currUser = useSelector((state) => state.user.user);

  const isShippingFree = Boolean(total > 1000);

  function totalCalcHelper(total, isShippingFree) {
    const cartDiscount = Math.floor((10 / 100) * total);
    if (isShippingFree) {
      shippingCost = 20;
    }
    return total - cartDiscount + platformFee + shippingCost - couponDiscount;
  }

  finalTotal = totalCalcHelper(total, isShippingFree);

  return (
    <div className="checkout_container">
      <p>PRICE DETAILS</p>
      <Row>
        <Col span={12}>Total MRP</Col>
        <Col span={12}>₹{Math.floor(total)}</Col>
      </Row>
      <Row>
        <Col span={12}>Discount on MRP (10%) </Col>
        <Col style={{ color: "#03A685" }} span={12}>
          -₹{Math.floor((10 / 100) * total)}
        </Col>
      </Row>

      <Row>
        <Col span={12}>Coupon Discount ({couponDiscountPercent}%) </Col>
        <Col style={{ color: "#03A685" }} span={12}>
          -₹{couponDiscount}
        </Col>
      </Row>
      <Row>
        <Col span={12}>Platform Fee</Col>
        <Col span={12}>₹20</Col>
      </Row>
      <Row>
        <Col span={12}>Shipping Fee</Col>
        <Col style={{ color: `${isShippingFree ? "#03A685" : ""}` }} span={12}>
          ₹{isShippingFree ? "FREE" : 20}
        </Col>
      </Row>
      <Row className="total">
        <Col span={12}>Total Amount</Col>
        <Col span={12}>₹{finalTotal}</Col>
      </Row>

      <Razor
        finalTotal={finalTotal}
        AddressList={AddressList}
        user={currUser}
      />
    </div>
  );
};

//!razorpay integeration

function Razor({ finalTotal, AddressList, user }) {
  const [Razorpay] = useRazorpay();

  const handlePayment = async (params) => {
    var options = {
      key: "rzp_test_yw82UVdqb63LLR",
      amount: `${finalTotal * 100}`,
      currency: "INR",
      name: "Clothify",
      description: "Bill",
      image: <logo />,
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: `${user.name}`,
        email: `${user.email}`,
        // contact: "8787878787",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#d26900",
      },
    };

    var rzp1 = new Razorpay(options);

    // rzp1.open(totalValue);
    // const rzp1 = new Razorpay(options);

    // rzp1.on("payment.failed", function (response) {
    //   alert(response.error.code);
    //   alert(response.error.description);
    //   alert(response.error.source);
    //   alert(response.error.step);
    //   alert(response.error.reason);
    //   alert(response.error.metadata.order_id);
    //   alert(response.error.metadata.payment_id);
    // });

    rzp1.open();
  };

  return (
    <div>
      {/* <button className="razor-pay-btn" onClick={handlePayment}>
        Pay Via Razorpay
      </button> */}
      <Popover
        placement="right"
        content={AddressList.length === 0 && "Add address to place order"}
      >
        <Button
          block
          onClick={handlePayment}
          type="primary"
          disabled={AddressList.length > 0 ? false : true}
        >
          PLACE ORDER
        </Button>
      </Popover>
    </div>
  );
}

export default CheckoutSummary;
