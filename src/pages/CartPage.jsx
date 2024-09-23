import React, { useState } from "react";
import CartItem from "../components/Cart/CartItem";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import CheckoutSummary from "../components/Cart/Checkout";
import CouponModal from "../components/Coupon/CouponModal";
import emptybag from "../asset/empty-bag.webp";
import "./CartPage.css";
import Header from "../Layout/Header";
import Address from "../components/Address/Address";

const CartPage = () => {
  let [couponDiscountPercent, setCouponDiscountPercent] = useState(0);
  const cartList = useSelector((state) => state.user.user.cart);
  console.log(cartList);

  if (cartList.length === 0) {
    return (
      <>
        <Header />
        <EmptyCart />
      </>
    );
  }

  let total = cartList.reduce(
    (acc, initial) => acc + initial.price * initial.quantity,
    0
  );

  total = Math.floor(total);

  return (
    <>
      <Header />
      <div className="cart_page">
        <div className="cart_page_left">
          {/* all the address related components addressform,modal etc */}
          <Address />

          {/* Cart List */}
          <div className="cart-product-list">
            {cartList.map((item) => {
              return <CartItem item={item} key={item.id} />;
            })}
          </div>
        </div>

        <div className="cart_page_right">
          <CouponModal
            total={total}
            setCouponDiscountPercent={setCouponDiscountPercent}
            couponDiscountPercent={couponDiscountPercent}
          />
          <CheckoutSummary
            total={total}
            couponDiscountPercent={couponDiscountPercent}
          />
        </div>
      </div>
    </>
  );
};

const EmptyCart = () => {
  return (
    <div className="emptybag">
      <img src={emptybag} alt="empty_bag" />
      <p> There is nothing in your bag. Let's add some items.</p>
      <Button>
        <NavLink to="/wishlist">Add Items from the Wishlist</NavLink>
      </Button>
    </div>
  );
};

export default CartPage;
