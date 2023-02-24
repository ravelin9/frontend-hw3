import React, { useState, useEffect } from "react";

import Card from "@components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./relatedItems.module.scss";
import { IProducts } from "../../app/pages/products/model/IProducts";

// @ts-ignore
const RelatedItems = ({ categoryId }) => {
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get<IProducts[]>(
          `https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`
        );
        setRelatedProducts(response.data.slice(0, 4)); // get first three related products
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };

    fetchRelatedProducts();
  }, [categoryId]);

  return (
    <>
      <div className={styles.title}>Related Items</div>
      <div className={styles.relatedItemsContainer}>
        {relatedProducts.map((product) => (
          <Card
            key={product.id}
            category={product.category.name}
            image={product.images[0]}
            title={product.title}
            subtitle="Combination of wood and wool"
            content={`$${product.price}`}
            onClick={() => navigate(`/product/${product.id}`)}
          />
        ))}
      </div>
    </>
  );
};

export default RelatedItems;
