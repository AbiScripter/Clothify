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
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-full md:col-span-3 flex flex-col gap-8 p-4 sm:border-r pr-6">
          {/* all the address related components addressform,modal etc */}
          <div className="sm:border-b pb-4">
            <Address />
          </div>

          {/* Cart List */}
          <div className="cart-product-list grid grid-cols-1 gap-4">
            {cartList.map((item) => {
              return <CartItem item={item} key={item.id} />;
            })}
          </div>
        </div>

        <div className="col-span-full md:col-span-2 p-4 flex flex-col gap-8">
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
    <div className="flex flex-col items-center gap-2 h-[90vh] justify-center">
      <img src={emptybag} alt="empty_bag" className="h-32 sm:h-44" />
      <p> There is nothing in your bag. Let's add some items.</p>
      <Button type="primary">
        <NavLink to="/wishlist">Add Items from the Wishlist</NavLink>
      </Button>
    </div>
  );
};

export default CartPage;
