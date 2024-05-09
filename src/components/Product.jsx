import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fullHeart, emptyHeart } from "../asset/svgs";
import { Button, Card, notification } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import {
  addToCart,
  removeFromCart,
  addToWishlist,
  deleteFromWishList,
} from "../slices/accountSlice";

const Product = ({ data }) => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.user.user);
  const currAccount = useSelector((state) => state.account);
  const cart = useSelector((state) => state.account.cart);
  const wishlist = useSelector((state) => state.account.wishlist);

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
  console.log(currUser);

  const handleCartAdd = (item) => {
    // dispatch(addToCart(item));
    dispatch(
      addToCart({ data: item, userId: currUser.uid, dataId: currUser.dataId })
    );
    handleNotification("bag", "add");
  };

  const handleCartSub = (item) => {
    // dispatch(removeFromCart(item));
    dispatch(
      removeFromCart({
        data: item,
        userId: currUser.uid,
        dataId: currUser.dataId,
      })
    );
    handleNotification("bag", "remove");
  };

  const handleAddWishlist = (item) => {
    // dispatch(addToWishlist(item));
    dispatch(
      addToWishlist({
        data: item,
        userId: currUser.uid,
        dataId: currUser.dataId,
      })
    );
    handleNotification("wishlist", "add");
  };

  const handleDeleteWishlist = (item) => {
    // dispatch(deleteFromWishList(item));
    dispatch(
      deleteFromWishList({
        data: item,
        userId: currUser.uid,
        dataId: currUser.dataId,
      })
    );
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
        cover={
          //memoize the image
          <ImageComponent src={data.imageUrl} />
          // <img src={data.imageUrl} alt="product" className="product-card" />
        }
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

        <p>
          <span>{data.name}</span>
          <br />
          <span>Rs. {data.price}</span>
        </p>

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
      </Card>
    </div>
  );
};

//!memoizing image so it doesnot rerender every time
const ImageComponent = memo(({ src }) => {
  return <img src={src} alt="product" />;
});

export default Product;
