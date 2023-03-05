import React, { useEffect, useCallback } from "react";

import Card from "@components/Card";
import { useStores } from "@utils/hooks/useStores";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import styles from "./relatedItems.module.scss";

type Props = {
  categoryId: number;
};

const RelatedItems = observer(({ categoryId }: Props) => {
  const navigate = useNavigate();
  const relatedItemsStore = useStores();
  useEffect(() => {
    relatedItemsStore.relatedItemsStore.fetchRelatedProducts(categoryId);
  }, [categoryId, relatedItemsStore.relatedItemsStore]);

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
        {relatedItemsStore.relatedItemsStore.relatedProducts.map((product) => (
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
});

export default RelatedItems;
