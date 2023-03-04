import axios from "axios";
import { action, makeObservable, observable } from "mobx";

import { IProducts } from "../entities/client";

export class ProductsStore {
  products: IProducts[] = [];
  selectedCategory = "";

  constructor() {
    makeObservable(this, {
      products: observable,
      selectedCategory: observable,
      setProducts: action,
      setSelectedCategory: action,
      fetchProducts: action,
    });
  }

  setProducts(products: IProducts[]) {
    this.products = products;
  }

  setSelectedCategory(categoryId: string) {
    this.selectedCategory = categoryId;
  }

  async fetchProducts(searchQuery: string) {
    try {
      const response = await axios.get<IProducts[]>(
        `https://api.escuelajs.co/api/v1/products/?title=${searchQuery}&categoryId=${this.selectedCategory}`
      );
      this.setProducts(response.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}
