import { makeAutoObservable } from "mobx";

import { ProductsStore } from "./ProductsStore";

export interface Category {
  id: string;
  name: string;
}

export class CategoriesStore {
  categories: Category[] = [];
  selectedCategories: Category[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCategories() {
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/categories"
      );
      const data = await response.json();
      this.categories = data.map((category: Category) => ({
        id: category.id,
        name: category.name,
      }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  setSelectedCategoriesAndHandleChange(
    categories: Category[],
    onChange?: (categoryId: string) => void,
    productsStore?: ProductsStore
  ) {
    this.selectedCategories = categories;
    if (onChange) {
      if (categories.length === 0) {
        productsStore?.setSelectedCategory("");
      } else {
        onChange(categories[0].id);
        productsStore?.setSelectedCategory(categories[0].id.toString());
      }
    }
  }
}
