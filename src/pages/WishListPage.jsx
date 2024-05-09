import React from "react";
import "./WishListPage.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Flex } from "antd";
import emptyWishlist from "../asset/empty-wishlist.png";
import { NavLink } from "react-router-dom";
import Header from "../Layout/Header";
import {
  addToWishlist,
  deleteFromWishList,
  addToCart,
} from "../slices/accountSlice";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.account.wishlist);
  const currUser = useSelector((state) => state.user.user);
  console.log(currUser);
  console.log(list);

  if (list.length === 0) {
    return (
      <>
        <Header />
        <EmptyWishlist />
      </>
    );
  }

  const handleDeleteWishlist = (item) => {
    console.log(item);
    // dispatch(deleteFromWishList(item));
    dispatch(
      deleteFromWishList({
        data: item,
        userId: currUser.uid,
        dataId: currUser.dataId,
      })
    );
  };

  const handleMovingToCart = (item) => {
    console.log(item);
    // dispatch(deleteFromWishList(item));
    dispatch(
      deleteFromWishList({
        data: item,
        userId: currUser.uid,
        dataId: currUser.dataId,
      })
    );

    // dispatch(addToCart(item));
    dispatch(
      addToCart({ data: item, userId: currUser.uid, dataId: currUser.dataId })
    );
  };

  return (
    <>
      <Header />
      <div className="wishlist_container">
        {list.map((item) => {
          return (
            <div className="wishlist_product" key={item.id}>
              <Card cover={<img src={item.imageUrl} alt="product" />}>
                <p>
                  <span>{item.name}</span>
                  <br />
                  <span> Rs. {item.price}</span>
                </p>
                <div className="wishlist_product-btns">
                  <Button onClick={() => handleMovingToCart(item)}>
                    MOVE TO BAG
                  </Button>
                  <Button danger onClick={() => handleDeleteWishlist(item)}>
                    REMOVE
                  </Button>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};

const EmptyWishlist = () => {
  return (
    <div className="empty_wishlist">
      <img src={emptyWishlist} alt="empty-wishlist" />
      <p>Your Wish list is empty</p>
      <Button>
        <NavLink to="/home">Explore More</NavLink>
      </Button>
    </div>
  );
};

export default WishlistPage;
