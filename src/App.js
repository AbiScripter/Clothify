import "./App.css";
import { lazy, useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { setUser } from "./slices/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Signup from "./pages/Signup";
import PrivateRoutes from "./components/PrivateRoutes";
import SuspenseLoader from "./components/SuspenseLoader";

// import HomePage from "./pages/HomePage";
// import WishlistPage from "./pages/WishListPage";
// import CartPage from "./pages/CartPage";
// import ProfilePage from "./pages/ProfilePage";
//!code splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const WishlistPage = lazy(() => import("./pages/WishListPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

function App() {
  const dispatch = useDispatch();
  // const currUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              // console.log(user);
              // console.log(userData);
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                  dataId: "",
                })
              );
            }
          },
          (error) => {
            console.error("Error fetching user data:", error);
          }
        );

        return () => {
          unsubscribeSnapshot();
        };
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, [dispatch]);

  return (
    <div>
      <>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
        />

        <Router>
          <Suspense fallback={<SuspenseLoader />}>
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </>
    </div>
  );
}

export default App;
