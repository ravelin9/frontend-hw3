import React from "react";

import styles from "./Card.module.scss";

export type CardProps = {
  category: string;
  image: string;
  title: string;
  subtitle?: React.ReactNode;
  content?: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({
  category,
  image,
  title,
  subtitle,
  content,
  onClick,
}) => {
  return (
    <div onClick={onClick} className={styles.card}>
      <img className={styles.img} src={image} alt={title} loading={"lazy"} />
      <div style={{ padding: "10px" }}>
        <div className={styles.subtitle}>{category}</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
        <div className={styles.price}>{content}</div>
      </div>
    </div>
  );
};

export default React.memo(Card);
