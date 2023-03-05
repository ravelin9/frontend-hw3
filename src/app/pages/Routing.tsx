import React from "react";

import Header from "@components/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductDetails from "./ProductDetails/ProductDetails";
import Products from "./Products/Products";
import { CategoriesStore } from "../../store/CategoriesStore";
import { ProductsStore } from "../../store/ProductsStore";
import { rootStore } from "../../store/RootStore";

const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Products
              store={new ProductsStore(rootStore)}
              categoriesStore={new CategoriesStore(rootStore)}
            />
          }
        />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
