import { makeAutoObservable, runInAction } from "mobx";

import { ProductsStore } from "./ProductsStore";
import { RootStore } from "./RootStore";
import { endpoints } from "../configs/endpoints";

export interface Category {
  id: string;
  name: string;
}

export class CategoriesStore {
  private readonly rootStore: RootStore;
  categories: Category[] = [];
  selectedCategories: Category[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  async fetchCategories() {
    try {
      const response = await this.rootStore.apiStore.fetch<[]>(
        endpoints.categories
      );
      runInAction(() => {
        this.categories = response.map((category: Category) => ({
          id: category.id,
          name: category.name,
        }));
      });
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
    runInAction(() => {
      this.selectedCategories = categories;
      if (onChange) {
        if (categories.length === 0) {
          productsStore?.setSelectedCategory("");
        } else {
          onChange(categories[0].id);
          productsStore?.setSelectedCategory(categories[0].id.toString());
        }
      }
    });
  }
}
