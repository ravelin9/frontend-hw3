import axios from "axios";
import { action, makeObservable, observable } from "mobx";

interface Category {
  id: string;
  name: string;
}

export class CategoriesStore {
  categories: Category[] = [];

  constructor() {
    makeObservable(this, {
      categories: observable,
      fetchCategories: action,
    });
  }

  async fetchCategories() {
    const response = await axios.get<Category[]>(
      "https://api.escuelajs.co/api/v1/categories"
    );
    this.categories = response.data;
  }
}
