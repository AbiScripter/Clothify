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
    <div className="home-product">
      <Card
        className="home-product-card"
        cover={<img src={data.imageUrl} alt="product" />}
      >
        {isWishlisted ? (
          <span className="heart" onClick={() => handleDeleteWishlist(data)}>
            {fullHeart}
          </span>
        ) : (
          <span className="heart" onClick={() => handleAddWishlist(data)}>
            {emptyHeart}
          </span>
        )}

        <p className="home-product-card-main">
          <span>{data.name}</span>
          <br />
          <span>₹{data.price}</span>
        </p>

        <div className="home-product-card-footer">
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
    </div>
  );
};

export default Product;
