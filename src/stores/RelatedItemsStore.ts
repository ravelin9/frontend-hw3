import { makeAutoObservable } from "mobx";

import { RootStore } from "./RootStore";
import { endpoints } from "../configs/endpoints";
import { IProducts } from "../entities/client";

export class RelatedItemsStore {
  private readonly rootStore: RootStore;
  relatedProducts: IProducts[] = [];
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
  setRelatedProducts(products: IProducts[]) {
    this.relatedProducts = products;
  }

  async fetchRelatedProducts(categoryId: number) {
    try {
      const response = await this.rootStore.apiStore.fetch<IProducts[]>(
        endpoints.related(categoryId)
      );
      this.setRelatedProducts(response.slice(0, 4));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}
