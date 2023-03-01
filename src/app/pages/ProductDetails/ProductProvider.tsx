











//В процессе







import React, { createContext, useState, useEffect } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

import { IProductContext, IProducts } from "../../../entities/client";

interface Props {
  children: React.ReactNode;
}

export const ProductContext = createContext<IProductContext>({
  product: {
    images: [],
    title: "",
    description: "",
    price: 0,
    category: { id: 0, image: "", name: "" },
    id: 0,
  },
  isLoading: false,
});

const ProductContextProvider = ({ children }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProducts>({
    images: [],
    title: "",
    description: "",
    price: 0,
    category: { id: 0, image: "", name: "" },
    id: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get<IProducts>(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <ProductContext.Provider value={{ product, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
