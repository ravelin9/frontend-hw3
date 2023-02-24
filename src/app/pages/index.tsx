import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductDetails from "./productDetails";
import Products from "./products";
import ProductsProvider from "./products/ProductsProvider";
import Header from "../../components/header";
const Routing = () => {
  return (
    <ProductsProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </ProductsProvider>
  );
};

export default Routing;
