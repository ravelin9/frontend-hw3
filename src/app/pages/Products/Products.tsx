import React, { useEffect, useCallback } from "react";

import Button from "@components/Button/Button";
import Card from "@components/Card";
import CategoriesDropdown from "@components/CategoriesDropdown/CategoriesDropdown";
import Input from "@components/Input/Input";
import Loader from "@components/Loader/Loader";
import Counter from "@components/ProductCount/Counter";
import { observer } from "mobx-react-lite";
import qs from "qs";
import ReactPaginate from "react-paginate";
import { useLocation, useNavigate } from "react-router-dom";

import ProductsLabel from "./model";
import styles from "./Products.module.scss";
import { IProducts } from "../../../entities/client";
import { CategoriesStore } from "../../../store/CategoriesStore";
import { ProductsStore } from "../../../store/ProductsStore";

interface Props {
  store: ProductsStore;
  categoriesStore: CategoriesStore;
}

const Products = observer(({ store, categoriesStore }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = store.searchQuery;
  const selectedCategory = store.selectedCategory;
  const currentPage = store.currentPage;
  const pageCount = Math.ceil(store.products.length / 9);
  const productCount = store.filteredProducts.length;

  useEffect(() => {
    store.fetchProducts();
  }, [store, currentPage, selectedCategory]);
  const displayProducts = store.filteredProducts
    .slice(currentPage * 9, (currentPage + 1) * 9)
    .map((pro: IProducts) => (
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

  const handlePageClick = ({ selected }: { selected: number }) => {
    store.setCurrentPage(selected);
    const query = qs.stringify({ page: selected, searchQuery });
    navigate(`${location.pathname}?${query}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const query = qs.stringify({ page: 0, searchQuery });
      navigate(`${location.pathname}?${query}`);
    }
  };

  const handleCategoryChange = (category: string) => {
    store.setSelectedCategory(category);
    store.setSelectedCategory(category);
    store.setCurrentPage(0); // Сброс текущей страницы
    const query = qs.stringify({ page: 0, searchQuery, categoryID: category }); // Добавление categoryID в строку запроса URL
    navigate(`${location.pathname}?${query}`);
  };
  const handleSearch = useCallback(
    (value: string) => {
      store.setSearchQuery(value);
      store.fetchProducts();
    },
    [store]
  );

  useEffect(() => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    const page = parseInt(query.page as string, 10) || 0;
    const search = (query.searchQuery as string) || "";
    store.setCurrentPage(page);
    store.setSearchQuery(search);
  }, [store, location.search]);
  useEffect(() => {
    Promise.all([store.fetchProducts(), categoriesStore.fetchCategories()]);
  }, [store, currentPage, searchQuery, selectedCategory, categoriesStore]);
  return (
    <>
      <ProductsLabel />
      <div className={styles.container_search}>
        <Input
          placeholder="Search property"
          value={store.searchQuery}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />
        <div className={styles.button}>
          <Button
            onClick={() => {
              const query = qs.stringify({ page: currentPage, searchQuery });
              navigate(`${location.pathname}?${query}`);
            }}
          >
            Find Now
          </Button>
        </div>
      </div>
      <div className={styles.container_dropdown}>
        <CategoriesDropdown onChange={handleCategoryChange} />
      </div>
      <div className={styles.container_label}>
        Total Product <Counter count={productCount} />
      </div>

      {store.isLoading ? (
        <Loader className={styles.loader} loading={true} />
      ) : (
        <>
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
      )}
    </>
  );
});

export default Products;
