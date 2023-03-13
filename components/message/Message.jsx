/* eslint-disable @next/next/no-img-element */
import { iconsUrl } from "@/utils/urls";
import React from "react";
import styles from "./Message.module.scss";

export default function Message({ title }) {
  return (
    <div className={styles.container}>
      <div className={styles.messageBox}>
        <img
          className={styles.checkMark}
          alt="icon message"
          src={`${iconsUrl}/general/green-checkmark.svg`}
        />
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  );
}
