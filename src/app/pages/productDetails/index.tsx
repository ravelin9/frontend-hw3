import React, { useState, useEffect } from "react";

import { Button } from "@components/Button/Button";
import { Loader } from "@components/Loader/Loader";
import RelatedItems from "@components/RealtedItems";
import axios from "axios";
import { useParams } from "react-router-dom";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.css";
import "swiper/css/navigation";
import styles from "./productDetails.module.scss";
import { IProducts } from "../products/model/IProducts";

SwiperCore.use([Navigation, Pagination, Autoplay]);

function ProductDetails() {
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
    async function fetchProduct() {
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
    }

    fetchProduct();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Loader className={styles.loader} loading={true} />
      ) : (
        <>
          <div className={styles.mainContainer}>
            <div className={styles.sliderContainer}>
              <Swiper navigation autoplay={{ delay: 5000 }} loop>
                {product.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      className={styles.img}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
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
      )}
    </>
  );
}

export default ProductDetails;
