import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

import {
  addToWishlist,
  addToCart,
  deleteFromCart,
  removeFromCart,
} from "../slices/accountSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.user.user);

  const handleMovingToWishlist = (item) => {
    //first add to wishlist
    // dispatch(addToWishlist(item));

    dispatch(
      addToWishlist({
        data: item,
        userId: currUser.uid,
        dataId: currUser.dataId,
      })
    );

    //delete item from the cart
    // dispatch(deleteFromCart(item));

    dispatch(
      deleteFromCart({
        data: item,
        userId: currUser.uid,
        dataId: currUser.dataId,
      })
    );
  };

  const handleCartDelete = (item) => {
    // dispatch(deleteFromCart(item));
    dispatch(
      deleteFromCart({
        data: item,
        userId: currUser.uid,
        dataId: currUser.dataId,
      })
    );
  };

  const handleCartAdd = (item) => {
    // dispatch(addToCart(item));
    dispatch(
      addToCart({
        data: item,
        userId: currUser.uid,
        dataId: currUser.dataId,
      })
    );
  };

  const handleCartSub = (item) => {
    console.log("sub", item.quantity);
    //if its the last item
    if (item.quantity === 1) {
      // dispatch(deleteFromCart(item));
      dispatch(
        deleteFromCart({
          data: item,
          userId: currUser.uid,
          dataId: currUser.dataId,
        })
      );
      return;
    }
    // dispatch(removeFromCart(item));
    dispatch(
      removeFromCart({
        data: item,
        userId: currUser.uid,
        dataId: currUser.dataId,
      })
    );
  };

  return (
    <div>
      {item.quantity > 0 ? (
        <Card
          className="cart-product-card"
          cover={
            <img
              src={item.imageUrl}
              alt="product"
              className="cart-product-img"
            />
          }
        >
          <div>
            <h3>{item.name}</h3>

            <Button size="small" onClick={() => handleCartSub(item)}>
              <MinusOutlined />
            </Button>
            <span> {item.quantity} </span>
            <Button size="small" onClick={() => handleCartAdd(item)}>
              {/* <span class="material-symbols-outlined">add</span> */}
              <PlusOutlined />
            </Button>

            <p>₹{Math.floor(item.quantity * item.price)}</p>
          </div>

          <div className="cart-product-btns">
            <Button size="small" onClick={() => handleMovingToWishlist(item)}>
              <span>MOVE TO WISHLIST</span>
            </Button>
            <Button size="small" danger onClick={() => handleCartDelete(item)}>
              DELETE FROM CART
            </Button>
          </div>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
};

export default CartItem;
