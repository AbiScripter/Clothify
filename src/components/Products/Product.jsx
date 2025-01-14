import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fullHeart, emptyHeart } from "../../asset/svgs";
import { Button, Card, notification } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import {
  addToCart,
  removeFromCart,
  addToWishlist,
  deleteFromWishList,
} from "../../slices/userSlice";

const Product = ({ data }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cart = user.cart || [];
  const wishlist = user.wishlist || [];

  const getProductQuantity = (productId) => {
    const product = cart.find((p) => p.id === productId);
    return product ? product.quantity : 0;
  };

  const getIsProductWishlisted = (productId) => {
    const product = wishlist.find((p) => p.id === productId);
    return product ? true : false;
  };

  const qty = getProductQuantity(data.id);
  const isWishlisted = getIsProductWishlisted(data.id);

  // const imageUrl = `${window.location.origin}/${data.imageUrl}`;

  const handleCartAdd = (item) => {
    dispatch(addToCart(item));
    handleNotification("bag", "add");
  };

  const handleCartSub = (item) => {
    dispatch(removeFromCart(item));
    handleNotification("bag", "remove");
  };

  const handleAddWishlist = (item) => {
    dispatch(addToWishlist(item));
    handleNotification("wishlist", "add");
  };

  const handleDeleteWishlist = (item) => {
    dispatch(deleteFromWishList(item));
    handleNotification("wishlist", "remove");
  };

  const handleNotification = (where, actionType) => {
    notification.open({
      message: `Product ${actionType}${
        actionType === "add" ? "ed to" : "d from"
      } the ${where}`,
      duration: 1,
      type: "success",
    });
  };

  return (
    <Card
      className="relative"
      cover={<img src={data.imageUrl} alt="product" />}
    >
      {isWishlisted ? (
        <span
          className="absolute right-2 top-1"
          onClick={() => handleDeleteWishlist(data)}
        >
          {fullHeart}
        </span>
      ) : (
        <span
          className="absolute right-2 top-1"
          onClick={() => handleAddWishlist(data)}
        >
          {emptyHeart}
        </span>
      )}

      <p className="flex flex-col items-center gap-1">
        <span className="capitalize">{data.name}</span>
        <span>₹{data.price}</span>
      </p>

      <div className="flex justify-center items-center mt-2">
        {qty >= 1 ? (
          <div>
            <Button size="small" onClick={() => handleCartSub(data)}>
              <MinusOutlined />
            </Button>
            <span> {qty} </span>

            <Button size="small" onClick={() => handleCartAdd(data)}>
              <PlusOutlined />
            </Button>
          </div>
        ) : (
          <Button onClick={() => handleCartAdd(data)}>Add to cart</Button>
        )}
      </div>
    </Card>
  );
};

export default Product;
