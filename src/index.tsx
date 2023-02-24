import React from "react";

import ReactDOM from "react-dom/client";

import Routing from "./app/pages";
import ProductsProvider from "./app/pages/products/ProductsProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ProductsProvider>
      <Routing />
    </ProductsProvider>
  </React.StrictMode>
);
