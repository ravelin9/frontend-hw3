import React, { useState, useEffect } from "react";

import { Button } from "@components/Button/Button";
import Card from "@components/Card";
import { Input } from "@components/Input/Input";
import { MultiDropdown, Option } from "@components/MultiDropdown/MultiDropdown";
import ProductCount from "@components/ProductCount";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

import ProductsLabel from "./model";
import styles from "./Products.module.scss";
import { useProducts } from "./ProductsProvider";

const Products = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const productCount = products.length;
  const productsPerPage = 9; // сколько товаров отображать на странице
  const pageCount = Math.ceil(productCount / productsPerPage); // сколько всего страниц нужно
  const [currentPage, setCurrentPage] = useState(0); // текущая страница

  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage !== null) {
      setCurrentPage(parseInt(savedPage, 10));
    }
  }, []); // только при монтировании компонента

  // @ts-ignore
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    localStorage.setItem("currentPage", selected.toString());
  };

  const displayProducts = products
    .slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage) // выбрать только товары, которые нужно показывать на текущей странице
    .map((pro) => (
      <div key={pro.id} className={styles.cards}>
        <Card
          category={pro.category.name}
          image={pro.images[0]}
          title={pro.title}
          subtitle="Combination of wood and wool"
          content={`$${pro.price}`}
          onClick={() => navigate(`/product/${pro.id}`)}
        />
      </div>
    ));

  return (
    <>
      <ProductsLabel />
      <div className={styles.searchContainer}>
        <Input
          placeholder="Search property"
          onChange={(value: string) => alert(value)}
        />
        <div className={styles.button}>
          <Button>Find Now</Button>
        </div>
      </div>
      <div className={styles.dropdownContainer}>
        <MultiDropdown
          options={[
            { key: "3", value: "Electronics" },
            { key: "2", value: "Shoes" },
            { key: "4", value: "Others" },
          ]}
          value={[{ key: "2", value: "Shoes" }]}
          pluralizeOptions={(values: Option[]) => `Filter: ${values.length}`}
        />
      </div>
      <div className={styles.counterLabel}>
        Total Product <ProductCount />
      </div>

      <div className={styles.cardContainer}>{displayProducts}</div>
      <ReactPaginate
        previousLabel={<div className={styles.vectorPrevious} />}
        nextLabel={<div className={styles.vectorNext} />}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        pageClassName={styles.page}
        pageLinkClassName={styles.links}
        disabledClassName={styles.disabledVector}
        forcePage={currentPage} // устанавливаем текущую страницу в пагинации
      />
    </>
  );
};

export default Products;
