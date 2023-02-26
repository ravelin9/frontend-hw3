import React, { useState, useEffect } from "react";

import Button from "@components/Button/Button";
import Card from "@components/Card";
import Input from "@components/Input/Input";
import MultiDropdown, { Option } from "@components/MultiDropdown/MultiDropdown";
import ProductCount from "@components/ProductCount/ProductCount";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

import ProductsLabel from "./model";
import styles from "./Products.module.scss";
import { useProducts } from "./ProductsProvider";

const Products = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  const productCount = products.length;
  const productsPerPage = 9;
  const pageCount = Math.ceil(productCount / productsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage !== null) {
      setCurrentPage(parseInt(savedPage, 10));
    }
  }, []);

  // @ts-ignore
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    localStorage.setItem("currentPage", selected.toString());
  };

  const displayProducts = products
    .slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage)
    .map((pro) => (
      <div key={pro.id} className={styles.card}>
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
      <div className={styles.container_search}>
        <Input
          placeholder="Search property"
          onChange={(value: string) => value}
        />
        <div className={styles.button}>
          <Button>Find Now</Button>
        </div>
      </div>
      <div className={styles.container_dropdown}>
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
      <div className={styles.container_label}>
        Total Product <ProductCount />
      </div>

      <div className={styles.container_card}>{displayProducts}</div>
      <ReactPaginate
        previousLabel={<div className={styles.vector_previous} />}
        nextLabel={<div className={styles.vector_next} />}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        pageClassName={styles.page}
        pageLinkClassName={styles.links}
        disabledClassName={styles.vector_disabled}
        forcePage={currentPage}
      />
    </>
  );
};

export default Products;
