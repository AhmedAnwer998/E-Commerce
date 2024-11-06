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
import AOS from 'aos';
import "aos/dist/aos.css";

const App = () => {


  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);



  return (
    <BrowserRouter>
      <NavBar />
      <ProductProvider>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/MenClothing" element={<MenClothing />} />
          <Route path="/Jewelery" element={<Jewelery />} />
          <Route path="/Electronics" element={<Electronics />} />
          <Route path="/WomenClothes" element={<WomenClothes />} />
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  );
};

export default App;
