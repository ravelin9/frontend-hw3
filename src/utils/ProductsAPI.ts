import axios from "axios";

import { IProducts } from "../entities/client";

export const fetchProduct = async (id: string | undefined) => {
  const { data } = await axios.get<IProducts>(
    `https://api.escuelajs.co/api/v1/products/${id}`
  );
  return data;
};
