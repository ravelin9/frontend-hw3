import React from "react";

import Header from "@components/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductDetails from "./ProductDetails/ProductDetails";
import Products from "./Products/Products";
import ProductsProvider from "./Products/ProductsProvider";
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
