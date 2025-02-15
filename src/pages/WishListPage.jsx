import React from "react";
import "./WishListPage.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card } from "antd";
import emptyWishlist from "../asset/empty-wishlist.png";
import { NavLink } from "react-router-dom";
import Header from "../Layout/Header";
import { deleteFromWishList, addToCart } from "../slices/userSlice";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.user.user.wishlist);

  const handleDeleteWishlist = (item) => {
    dispatch(deleteFromWishList(item));
  };

  const handleMovingToCart = (item) => {
    dispatch(deleteFromWishList(item));
    dispatch(addToCart(item));
  };

  //if there is no wishlist
  if (wishlist.length === 0) {
    return (
      <>
        <Header />
        <EmptyWishlist />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:flex  gap-3 lg:gap-9 p-2 mt-8">
        {wishlist.map((product) => (
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
    <Card
      className="relative w-full xs:w-40 2xs:w-52 lg:w-60"
      cover={<img src={product.imageUrl} alt="product" />}
    >
      <p className="flex flex-col items-center">
        <span className="capitalize">{product.name}</span>
        <span>₹{product.price}</span>
      </p>
      <div className="flex gap-2 justify-center mt-2 flex-col 2xs:flex-row">
        <Button
          size="small"
          onClick={() => handleMovingToCart(product)}
          className="text-xs 2xs:text-sm"
        >
          MOVE TO BAG
        </Button>
        <Button
          size="small"
          className="text-xs 2xs:text-sm"
          danger
          onClick={() => handleDeleteWishlist(product)}
        >
          REMOVE
        </Button>
      </div>
    </Card>
  );
};

const EmptyWishlist = () => {
  return (
    <div className="flex flex-col items-center gap-2 h-[90vh] justify-center">
      <img src={emptyWishlist} alt="empty-wishlist" className="h-32 sm:h-44" />
      <p>Your Wish list is empty</p>
      <Button type="primary">
        <NavLink to="/home">Explore More</NavLink>
      </Button>
    </div>
  );
};

export default WishlistPage;
