import React from "react";

import styles from "./ProductCount.module.scss";
const Counter = ({ count }: { count: number }) => {
  return <div className={styles.counter}>{count}</div>;
};

export default React.memo(Counter);
