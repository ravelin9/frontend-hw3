import React from "react";

import { ProductsStore } from "./ProductsStore";

export class RootStore {
  productsStore: ProductsStore;

  constructor() {
    this.productsStore = new ProductsStore();
  }
}

export const rootStore = new RootStore();

export const RootStoreContext = React.createContext(rootStore);
