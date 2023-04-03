import React, { useEffect } from "react";

import Button from "@components/Button/Button";
import Loader from "@components/Loader/Loader";
import RelatedItems from "@components/RealtedItems/RelatedItems";
import Slider from "@components/Slider";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import styles from "./productDetails.module.scss";
import { ProductStore } from "../../../stores/ProductStore";
import { rootStore } from "../../../stores/RootStore";

const productStore = new ProductStore(rootStore);

const ProductDetails = observer(() => {
  const { id } = useParams<{ id: string }>();
  const isLoading = productStore.isLoading;

  useEffect(() => {
    if (id != null) {
      productStore.fetchProduct(Number(id));
    }
  }, [id]);

  if (isLoading) {
    return <Loader className={styles.loader} loading={true} />;
  }

  const product_info = (
    <>
      <div className={styles.title}>{productStore.product.title}</div>
      <div className={styles.description}>
        {productStore.product.description}
      </div>
      <div className={styles.price}>{`$${productStore.product.price}`}</div>
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
            <Slider product={productStore.product} />
          </div>
          <div className={styles.container_product}>{product_info}</div>
        </div>
        <div className={styles.container_related}>
          <RelatedItems categoryId={productStore.product.category.id} />
        </div>
      </>
    </>
  );
});

export default ProductDetails;
