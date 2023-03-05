import axios from "axios";
import { makeAutoObservable } from "mobx";

import { endpoints } from "../configs/endpoints";
import { IProducts } from "../entities/client";

export class ProductsStore {
  products: IProducts[] = [];
  selectedCategory: string = "";
  currentPage: number = 0;
  searchQuery: string = "";
  isLoading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setProducts(products: IProducts[]) {
    this.products = products;
  }

  setSelectedCategory(categoryId: string) {
    if (this.selectedCategory !== categoryId) {
      this.selectedCategory = categoryId;
      this.currentPage = 0;
      this.fetchProducts();
    }
  }

  setCurrentPage(page: number) {
    if (this.currentPage !== page) {
      this.currentPage = page;
      this.fetchProducts();
    }
  }

  async fetchProducts() {
    try {
      this.setIsLoading(true);

      const url =
        endpoints.baseUrl +
        endpoints.products(
          this.searchQuery,
          this.selectedCategory,
          this.currentPage
        );
      const response = await axios.get<IProducts[]>(url);
      this.setProducts(response.data);
      this.setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
    this.fetchProducts();
  }

  get filteredProducts() {
    return this.products.filter(
      (pro: any) =>
        pro.title.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (this.selectedCategory === "" ||
          pro.category.id === this.selectedCategory)
    );
  }
}
