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
      className="relative w-full 2xs:w-52 lg:w-60"
      cover={<img src={data.imageUrl} alt="product" />}
    >
      {isWishlisted ? (
        <span
          className="absolute right-2 top-1 cursor-pointer"
          onClick={() => handleDeleteWishlist(data)}
        >
          {fullHeart}
        </span>
      ) : (
        <span
          className="absolute right-2 top-1 cursor-pointer"
          onClick={() => handleAddWishlist(data)}
        >
          {emptyHeart}
        </span>
      )}

      <div className="flex flex-col gap-1">
        <p className="capitalize">{data.name}</p>
        <div className="flex justify-between items-center">
          <p>₹{data.price}</p>
          <div className="flex justify-center">
            {qty >= 1 ? (
              <div>
                <button
                  className="border border-gray-300  hover:border-gray-500 px-2 rounded-md"
                  onClick={() => handleCartSub(data)}
                >
                  <MinusOutlined />
                </button>
                <span> {qty} </span>

                <button
                  className="border border-gray-300 hover:border-gray-500 px-2 rounded-md"
                  onClick={() => handleCartAdd(data)}
                >
                  <PlusOutlined />
                </button>
              </div>
            ) : (
              <button
                className="border border-gray-300 hover:border-gray-500 px-2 sm:px-4 rounded-md"
                onClick={() => handleCartAdd(data)}
              >
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Product;
