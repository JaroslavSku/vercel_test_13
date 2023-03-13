import axios from "axios";
import { first, map } from "lodash";
import React, { useEffect, useState } from "react";
import styles from "./CrossSellProducts.module.scss";
import Image from "next/image";
import $c from "../../utils/currencyFormatter";
import { useRouter } from "next/router";
import { iconsUrl } from "@/utils/urls";

export default function CrossSellProducts({ area1, area2 }) {
  const [products, setproducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const {
        data: { crossSellProducts },
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/adverts/cross`,
        {
          params: {
            area1,
            area2,
          },
        }
      );
      console.log("crsss", crossSellProducts);
      setproducts(crossSellProducts);
    }
    fetchData();
  }, [area1, area2]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Zajímavé alternativy</h2>
      <ul className={styles.body}>
        {map(products, (product) => {
          const src =
            product?.images?.length > 0
              ? `${process.env.NEXT_PUBLIC_REACT_BE_API}/${
                  first(product?.images).src
                }`
              : `${iconsUrl}/upload-empty.png`;
          return (
            <li
              onClick={() =>
                router.push(
                  `/inzerat/${
                    product?.address?.replace(
                      /[,\s]+|\s+|[,\/]|[,\s]+/g,
                      "-"
                    ) || "bez"
                  }/${product._id}`
                )
              }
              className={styles.item}
            >
              <article className={styles.card}>
                <figure className={styles.figure}>
                  <Image
                    loader={() => src}
                    src={src}
                    width={500}
                    height={550}
                    cover
                    alt="obrázek nemovitost"
                    style={{ objectFit: "cover" }}
                  />
                </figure>
                <div className={styles.article}>
                  <div className={styles.firstLine}>
                    <div className={styles.firstLineTitle}>Pronájem bytu</div>
                    <div className={styles.address}>{product.address}</div>
                  </div>
                  <hr />
                  <div className={styles.middleLine}>
                    <span className={styles.layout}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path d="M18.317 2.5a3.184 3.184 0 013.178 3.002l.005.18v12.635a3.184 3.184 0 01-3.002 3.178l-.18.005H5.681a3.184 3.184 0 01-3.177-3.002l-.005-.18V5.681a3.184 3.184 0 013.002-3.177l.18-.005h12.635zM3.45 18.317c0 1.179.915 2.146 2.073 2.227l.16.006h8.664V9.375H3.449l.001 8.942zM18.317 3.45l-2.97-.001V20.55h2.97a2.234 2.234 0 002.227-2.073l.006-.16V5.683a2.234 2.234 0 00-2.073-2.227l-.16-.006zm-3.97-.001l-8.665.001a2.234 2.234 0 00-2.226 2.073l-.006.16-.001 2.692h10.898V3.449z"></path>
                      </svg>
                      <span>{product.layout}</span>
                    </span>

                    <span className={styles.area}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path d="M3 6.5a.5.5 0 01.492.41L3.5 7v11.5a2 2 0 001.85 1.995l.15.005H17a.5.5 0 01.09.992L17 21.5H5.5a3 3 0 01-2.995-2.824L2.5 18.5V7a.5.5 0 01.5-.5zm15.5-4a3 3 0 012.995 2.824l.005.176V17a.5.5 0 01-.992.09L20.5 17V5.5a2 2 0 00-1.85-1.995L18.5 3.5H7a.5.5 0 01-.09-.992L7 2.5h11.5z"></path>
                      </svg>
                      <span>
                        {product.size}m<sup>2</sup>
                      </span>
                    </span>
                  </div>
                  <hr />
                  <div className={styles.price}>{$c(product.rent)} </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
