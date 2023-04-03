import React from "react";

import { ApiStore } from "./APIStore";
import { CategoriesStore } from "./CategoriesStore";
import { ProductsStore } from "./ProductsStore";
import { ProductStore } from "./ProductStore";
import { RelatedItemsStore } from "./RelatedItemsStore";

export class RootStore {
  productsStore: ProductsStore;
  productStore: ProductStore;
  categoriesStore: CategoriesStore;
  apiStore: ApiStore;
  relatedItemsStore: RelatedItemsStore;

  constructor() {
    this.productsStore = new ProductsStore(this);
    this.categoriesStore = new CategoriesStore(this);
    this.apiStore = new ApiStore();
    this.productStore = new ProductStore(this);
    this.relatedItemsStore = new RelatedItemsStore(this);
  }
}

export const rootStore = new RootStore();

export const RootStoreContext = React.createContext(rootStore);
