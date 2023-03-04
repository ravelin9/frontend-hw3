import React from "react";

import Header from "@components/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductDetails from "./ProductDetails/ProductDetails";
import Products from "./Products/Products";
import { ProductsStore } from "../../store/ProductsStore";

const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Products store={new ProductsStore()} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
