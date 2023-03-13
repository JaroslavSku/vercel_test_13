import React from "react";
import styles from "./TitleColumn.module.scss";
export default function TitleColumn({ translate, id }) {
  return <span className={styles.firstColumn}>{translate[id].desc}</span>;
}
