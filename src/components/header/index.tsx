import React from "react";

import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}></Link>
      <Link to="/" className={styles.link}>
        Products
      </Link>
      <Link to="/product_details" className={styles.link}>
        Categories
      </Link>
      <Link to="/" className={styles.link}>
        About Us
      </Link>
      <Link to="/" className={styles.cart} />
      <Link to="/" className={styles.user} />
      <div className={styles.menu}></div>
    </header>
  );
};

export default Header;
