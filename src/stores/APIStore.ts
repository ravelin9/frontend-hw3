import axios from "axios";

import { endpoints } from "../configs/endpoints";

export class ApiStore {
  private readonly baseUrl: string = endpoints.baseUrl;

  async fetch<T>(url: string, method: "get" | "post" = "get"): Promise<T> {
    const response = await axios({
      method,
      url: `${this.baseUrl}${url}`,
    });
    return response.data;
  }
}
