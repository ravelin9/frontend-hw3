import React, { useState, useEffect, useCallback } from "react";

import Card from "@components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from "./relatedItems.module.scss";
import { IProducts } from "../../entities/client";

type Props = {
  categoryId: number;
};

const RelatedItems = ({ categoryId }: Props) => {
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get<IProducts[]>(
          `https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`
        );
        setRelatedProducts(response.data.slice(0, 4));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    fetchRelatedProducts();
  }, [categoryId]);

  const handleClick = useCallback(
    (id: number) => {
      navigate(`/product/${id}`);
    },
    [navigate]
  );

  return (
    <>
      <div className={styles.title}>Related Items</div>
      <div className={styles.container}>
        {relatedProducts.map((product) => (
          <Card
            key={product.id}
            category={product.category.name}
            image={product.images[0]}
            title={product.title}
            subtitle="Combination of wood and wool"
            content={`$${product.price}`}
            onClick={() => handleClick(product.id)}
          />
        ))}
      </div>
    </>
  );
};

export default React.memo(RelatedItems);
