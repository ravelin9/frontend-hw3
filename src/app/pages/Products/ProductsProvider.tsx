import React, { useEffect, useState, createContext, useContext } from "react";

import axios from "axios";

import { IProducts, IProductsContext } from "../../../entities/client";

export const ProductsContext = createContext<IProductsContext>({
  products: [],
});
export const useProducts = () => useContext(ProductsContext);
const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    axios
      .get<IProducts[]>("https://api.escuelajs.co/api/v1/products")
      .then((response) => {
        setProducts(response.data);
      });
  }, []);
  return (
    <>
      <ProductsContext.Provider value={{ products }}>
        {children}
      </ProductsContext.Provider>
    </>
  );
};

export default ProductsProvider;
