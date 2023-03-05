import { makeAutoObservable } from "mobx";

import { RootStore } from "./RootStore";
import { endpoints } from "../configs/endpoints";
import { IProducts } from "../entities/client";

export class ProductStore {
  private readonly rootStore: RootStore;
  product: IProducts = {
    images: [],
    title: "",
    description: "",
    price: 0,
    category: { id: 0, image: "", name: "" },
    id: 0,
  };
  isLoading: boolean = true;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  async fetchProduct(id: number) {
    this.setIsLoading(true);
    this.product = await this.rootStore.apiStore.fetch<IProducts>(
      endpoints.product(id)
    );
    this.setIsLoading(false);
  }
}
