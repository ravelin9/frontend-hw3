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
  return (
    <>
      <>
        <div className={styles.mainContainer}>
          <div className={styles.sliderContainer}>
            <Slider product={product} />
          </div>
          <div className={styles.productContainer}>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.description}>{product.description}</div>
            <div className={styles.price}>{`$${product.price}`}</div>
            <div className={styles.buttonsContainer}>
              <Button className={styles.buynowbtn}>Buy now</Button>
              <Button className={styles.cartbtn}>Add to cart</Button>
            </div>
          </div>
        </div>
        <div className={styles.relatedContainer}>
          <RelatedItems categoryId={product.category.id} />
        </div>
      </>
    </>
  );
};

export default ProductDetails;
