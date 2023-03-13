import React from "react";
import styles from "./AdvertEquipment.module.scss";

export default function AdvertEquipment({ equipment }) {
  return <span className={styles.body}>{equipment}</span>;
}
