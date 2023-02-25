import React from "react";

import styles from "./ProductsLabel.module.scss";
const ProductsLabel = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Products</div>
      <div className={styles.content}>
        We display products based on the latest products we have, if you want to
        see our old products please enter the name of the item
      </div>
    </div>
  );
};

export default ProductsLabel;
