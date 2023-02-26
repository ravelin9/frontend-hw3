import React, { useState, useEffect } from "react";

import Button from "@components/Button/Button";
import Loader from "@components/Loader/Loader";
import RelatedItems from "@components/RealtedItems/RelatedItems";
import Slider from "@components/Slider";
import axios from "axios";
import { useParams } from "react-router-dom";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.css";
import "swiper/css/navigation";
import styles from "./productDetails.module.scss";
import { IProducts } from "../../../entities/client";

SwiperCore.use([Navigation, Pagination, Autoplay]);

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
    const fetchProduct = async () => {
      try {
        const response = await axios.get<IProducts>(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        setProduct(response.data);
        setIsLoading(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchProduct();
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
        <Button className={styles.buynowbtn}>Buy now</Button>
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
