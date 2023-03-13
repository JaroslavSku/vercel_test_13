import React from "react";
import styles from "./EntryFooter.module.scss";
export default function EntryFooter({ showMore }) {
  return (
    <div className={styles.displayMore}>
      <span onClick={() => showMore()}>
        Zobrazit více<i className={styles.arrowDown}></i>
      </span>
    </div>
  );
}
