import Image from "next/image";
import React from "react";
import SearchMenu from "../searchmenu/SearchMenu";
import styles from "./Cover.module.scss";

export default function Cover() {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.imageContainer}>
          <Image
            alt="ubytovani"
            layout="fill"
            objectFit="cover"
            loading="lazy"
            src={`icons/cover/cover.avif`}
            loader={() => "icons/cover/cover.avif"}
          />
        </div>
        <div className={styles.content}>
          <SearchMenu />
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Splubydlící které jinde nanajdete</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
