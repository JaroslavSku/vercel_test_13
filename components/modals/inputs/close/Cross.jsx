import React from "react";
import styles from "./Cross.module.scss";

export default function Cross({ onClick }) {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.firstLine}>
        <div className={styles.secondLine}></div>
      </div>
    </div>
  );
}
