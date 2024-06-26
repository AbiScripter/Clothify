import React from "react";
import "./WishListPage.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card } from "antd";
import emptyWishlist from "../asset/empty-wishlist.png";
import { NavLink } from "react-router-dom";
import Header from "../Layout/Header";
import { deleteFromWishList, addToCart } from "../slices/accountSlice";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.account.wishlist);
  const currUser = useSelector((state) => state.user.user);

  //if there is no wishlist products
  if (list.length === 0) {
    return (
      <>
        <Header />
        <EmptyWishlist />
      </>
    );
  }

  const handleDeleteWishlist = (item) => {
    dispatch(
      deleteFromWishList({
        data: item,
        userId: currUser.uid,
        dataId: currUser.dataId,
      })
    );
  };

  const handleMovingToCart = (item) => {
    dispatch(
      deleteFromWishList({
        data: item,
        userId: currUser.uid,
        dataId: currUser.dataId,
      })
    );

    dispatch(
      addToCart({ data: item, userId: currUser.uid, dataId: currUser.dataId })
    );
  };

  return (
    <>
      <Header />
      <div className="wishlist_container">
        {list.map((product) => (
          <WishlistProduct
            product={product}
            key={product.id}
            handleDeleteWishlist={handleDeleteWishlist}
            handleMovingToCart={handleMovingToCart}
          />
        ))}
      </div>
    </>
  );
};

const WishlistProduct = ({
  product,
  handleDeleteWishlist,
  handleMovingToCart,
}) => {
  return (
    <div className="wishlist_product">
      <Card cover={<img src={product.imageUrl} alt="product" />}>
        <p>
          <span>{product.name}</span>
          <br />
          <span> Rs. {product.price}</span>
        </p>
        <div className="wishlist_product-btns">
          <Button onClick={() => handleMovingToCart(product)}>
            MOVE TO BAG
          </Button>
          <Button danger onClick={() => handleDeleteWishlist(product)}>
            REMOVE
          </Button>
        </div>
      </Card>
    </div>
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
