/* eslint-disable @next/next/no-img-element */
import { iconsUrl } from "@/utils/urls";
import React from "react";
import styles from "./TopButtons.module.scss";
export default function TopButtons({ handleDelete, handlePublish, data }) {
  const paidDate = data?.paidDate ? new Date(data.paidDate) : new Date();
  const today = new Date();
  const remainingTime =
    (today.getTime() - paidDate.getTime()) / (3600 * 24 * 1000);
  return (
    <div className={styles.topButtons}>
      <div className={styles.imageContainer} onClick={handleDelete}>
        <img
          className={styles.deleteImage}
          src={`${iconsUrl}/general/delete-red.svg`}
          alt="delete"
        />
        Smazat
      </div>
      <div>
        {remainingTime > 30 || remainingTime === 0 ? (
          <div onClick={handlePublish} className={styles.imageContainer}>
            <img
              className={styles.publishImage}
              src={`${iconsUrl}/general/play-button.svg`}
              alt="delete"
            />
            Zveřejnit
          </div>
        ) : null}
      </div>
    </div>
  );
}
