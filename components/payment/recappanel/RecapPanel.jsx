import React from "react";
import styles from "./RecapPanel.module.scss";
import { round } from "lodash";
export default function RecapPanel({ price, taxPercentage, pricing }) {
  const totalPrice = round(price + price * (taxPercentage / 100), 2);
  const tax = round(price * (taxPercentage / 100), 2);
  return (
    <div className={styles.recapPanel}>
      <p className={styles.header}>
        <span>Název: {pricing}</span>
        <span>Cena</span>
      </p>
      <p className={styles.taxPanel}>
        <span>Základ</span>
        <span>{`${price} Kč`}</span>
      </p>
      <p className={styles.percentagePanel}>
        <span>{`${taxPercentage}%`}</span>
        <span>{`${tax} Kč`}</span>
      </p>
      <p className={styles.resultPanel}>
        <span>Celkem</span>
        <span>{`${totalPrice} Kč`}</span>
      </p>
    </div>
  );
}
