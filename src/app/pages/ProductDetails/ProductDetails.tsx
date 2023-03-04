import React, { useState, useEffect } from "react";

import Button from "@components/Button/Button";
import Loader from "@components/Loader/Loader";
import RelatedItems from "@components/RealtedItems/RelatedItems";
import Slider from "@components/Slider";
import { fetchProduct } from "@utils/ProductsAPI";
import { useParams } from "react-router-dom";

import styles from "./productDetails.module.scss";
import { IProducts } from "../../../entities/client";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProducts>({
    images: [],
    title: "",
    description: "",
    price: 0,
    category: { id: 0, image: "", name: "" },
    id: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProduct(id)
      .then((data) => setProduct(data))
      .then(() => setIsLoading(false));
  }, [id]);
  if (isLoading) {
    return <Loader className={styles.loader} loading={true} />;
  }
  const product_info = (
    <>
      <div className={styles.title}>{product.title}</div>
      <div className={styles.description}>{product.description}</div>
      <div className={styles.price}>{`$${product.price}`}</div>
      <div className={styles.container_buttons}>
        <Button className={styles.button_buy_now}>Buy now</Button>
        <Button className={styles.button_cart}>Add to cart</Button>
      </div>
    </>
  );
  return (
    <>
      <>
        <div className={styles.container_main}>
          <div className={styles.container_slider}>
            <Slider product={product} />
          </div>
          <div className={styles.container_product}>{product_info}</div>
        </div>
        <div className={styles.container_related}>
          <RelatedItems categoryId={product.category.id} />
        </div>
      </>
    </>
  );
};

export default ProductDetails;
