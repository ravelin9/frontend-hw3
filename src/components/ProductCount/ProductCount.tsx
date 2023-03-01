import React from "react";

import styles from "./ProductCount.module.scss";
import { useProducts } from "../../app/pages/Products/ProductsProvider";
const ProductCount = () => {
  const { products } = useProducts();
  const productCount = products.length;
  return <div className={styles.counter}>{productCount}</div>;
};

export default React.memo(ProductCount);
