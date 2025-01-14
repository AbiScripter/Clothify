import React from "react";
import { useDispatch } from "react-redux";
import { Button, Card } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

import {
  addToWishlist,
  addToCart,
  deleteFromCart,
  removeFromCart,
} from "../../slices/userSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleCartAdd = (item) => {
    dispatch(addToCart(item));
  };

  const handleCartDelete = (item) => {
    dispatch(deleteFromCart(item));
  };

  const handleMovingToWishlist = (item) => {
    //add to wishlist
    dispatch(addToWishlist(item));

    //delete item from the cart
    handleCartDelete(item);
  };

  const handleCartSub = (item) => {
    //if its the last item delete it from cart , else subtract by 1
    if (item.quantity === 1) {
      handleCartDelete(item);
    } else {
      dispatch(removeFromCart(item));
    }
  };

  return (
    <div className="cart-product-card">
      {item.quantity > 0 ? (
        <Card
          className="cart-product-card flex h-44 p-0"
          cover={
            <img
              src={item.imageUrl}
              alt="product"
              style={{ minWidth: "7rem" }}
              className="cart-product-img h-full"
            />
          }
        >
          <div className="">
            <div className="flex flex-col gap-2">
              <h3 className="capitalize font-semibold">{item.name}</h3>

              <div>
                <Button size="small" onClick={() => handleCartSub(item)}>
                  <MinusOutlined />
                </Button>
                <span> {item.quantity} </span>
                <Button size="small" onClick={() => handleCartAdd(item)}>
                  {/* <span class="material-symbols-outlined">add</span> */}
                  <PlusOutlined />
                </Button>
              </div>

              <p>₹{Math.floor(item.quantity * item.price)}</p>
            </div>

            <div className="mt-2 flex-col sm:flex-row sm:mt-4 flex gap-2">
              <Button size="small" onClick={() => handleMovingToWishlist(item)}>
                <span>MOVE TO WISHLIST</span>
              </Button>
              <Button
                size="small"
                danger
                onClick={() => handleCartDelete(item)}
              >
                DELETE FROM CART
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
};

export default CartItem;
