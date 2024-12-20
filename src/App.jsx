import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList/ProductList";
import { ProductProvider } from "./ProductContext/ProductContext";
import ProductDetails from "./ProductDetails/ProductDetails";
import Cart from "./Cart/Cart";
import NavBar from "./NavBar/NavBar";
import MenClothing from "./MenClothing/MenClothing";
import Jewelery from "./Jewelery/Jewelery";
import Electronics from "./Electronics/Electronics";
import WomenClothes from "./WomenClothes/WomenClothes";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./Footer/Footer";
import BeforeFooter from "./BeforeFooter/BeforeFooter";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import { ThemeProvider } from "./ThemeContext/ThemeContext";
import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import Payment from "./Payment/Payment";

const stripePromise = loadStripe(
  "pk_test_51QVoljFHGnkbxB3AopE2T5X9YqMIvFgVfuhf916MVkwVy1EnWJKDVf5NX0ww0kM6cTneV9Nihk8lYGH47HaBhma800uZqye7Rx"
);
const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      once: true,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <BrowserRouter>
      <ProductProvider>
        <ThemeProvider>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <NavBar />
                  <ProductList />
                  <BeforeFooter />
                  <Footer />
                </>
              }
            />
            <Route
              path="/products/:id"
              element={
                <>
                  <NavBar />
                  <ProductDetails />
                  <Footer />
                </>
              }
            />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            {/* <Route
              path="/Payment"
              element={
                <>
                  <NavBar />
                  <Elements stripe={stripePromise}>
                    <Payment />
                  </Elements>

                  <Footer />
                </>
              }
            /> */}
            <Route
              path="/Cart"
              element={
                <>
                  <NavBar />
                  <Cart />
                  <Footer />
                </>
              }
            />
            <Route
              path="/MenClothing"
              element={
                <>
                  <NavBar />
                  <MenClothing />
                  <Footer />
                </>
              }
            />
            <Route
              path="/Jewelery"
              element={
                <>
                  <NavBar />
                  <Jewelery />
                  <Footer />
                </>
              }
            />
            <Route
              path="/Electronics"
              element={
                <>
                  <NavBar />
                  <Electronics />
                  <Footer />
                </>
              }
            />
            <Route
              path="/WomenClothes"
              element={
                <>
                  <NavBar />
                  <WomenClothes />
                  <Footer />
                </>
              }
            />
          </Routes>
        </ThemeProvider>
      </ProductProvider>
    </BrowserRouter>
  );
};

export default App;
