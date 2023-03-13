import React from "react";
import styles from "./HistoryEntry.module.scss";

export default function HistoryEntry({ date, name, info, createdAt }) {
  return (
    <div key={createdAt} className={styles.body}>
      <div className={styles.date}>
        {new Date(date).toLocaleString().split(",")}
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.info}>{(info && info?.idDoc) || ""}</div>
    </div>
  );
}
