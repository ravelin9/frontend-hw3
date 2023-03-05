import React from "react";

import Header from "@components/header/Header";
import { useLocalObservable } from "mobx-react-lite";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductDetails from "./ProductDetails/ProductDetails";
import Products from "./Products/Products";
import { CategoriesStore } from "../../stores/CategoriesStore";
import { ProductsStore } from "../../stores/ProductsStore";
import { rootStore } from "../../stores/RootStore";

const Routing = () => {
  const productsStore = useLocalObservable(() => new ProductsStore(rootStore));
  const categoriesStore = useLocalObservable(
    () => new CategoriesStore(rootStore)
  );
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Products store={productsStore} categoriesStore={categoriesStore} />
          }
        />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
