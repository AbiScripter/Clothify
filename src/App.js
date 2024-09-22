import "./App.css";
import { lazy, useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { initiateUser } from "./slices/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import PrivateRoutes from "./components/PrivateRoutes";
import SuspenseLoader from "./components/SuspenseLoader";

// import HomePage from "./pages/HomePage";
// import WishlistPage from "./pages/WishListPage";
// import CartPage from "./pages/CartPage";
// import ProfilePage from "./pages/ProfilePage";
// import Signup from "./pages/Signup";

//!code splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const WishlistPage = lazy(() => import("./pages/WishListPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const Signup = lazy(() => import("./pages/Signup"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const unsubscribeSnapshot = onSnapshot(
        docRef,
        (userDoc) => {
          if (!userDoc.exists()) return;
          //initiate the userdata with uid ,if its alrady singed initiate those data[cart,wishlist etc]
          dispatch(initiateUser(userDoc.data()));
        },
        (error) => console.error("Error fetching user data:", error)
      );

      return unsubscribeSnapshot;
    });

    return unsubscribeAuth;
  }, [dispatch]);

  return (
    <div>
      <>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={true}
          newestOnTop={true}
        />

        <Router>
          <Suspense fallback={<SuspenseLoader />}>
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </Suspense>
        </Router>
      </>
    </div>
  );
}

export default App;

//!SYNTAX OF ONSNAPSHOT
// const unsubscribe = onSnapshot(
//   collection(db, "cities"),
//   (snapshot) => {
//     // ...
//   },
//   (error) => {
//     // ...
//   }
// );
