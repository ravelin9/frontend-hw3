import React from "react";

import { ApiStore } from "./APIStore";
import { CategoriesStore } from "./CategoriesStore";
import { ProductsStore } from "./ProductsStore";

export class RootStore {
  productsStore: ProductsStore;
  categoriesStore: CategoriesStore;
  apiStore: ApiStore;

  constructor() {
    this.productsStore = new ProductsStore();
    this.categoriesStore = new CategoriesStore();
    this.apiStore = new ApiStore();
  }
}

export const rootStore = new RootStore();

export const RootStoreContext = React.createContext(rootStore);
