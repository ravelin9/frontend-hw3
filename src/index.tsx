import React from "react";

import ReactDOM from "react-dom/client";

import ProductsProvider from "./app/pages/Products/ProductsProvider";
import Routing from "./app/pages/Routing";

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
