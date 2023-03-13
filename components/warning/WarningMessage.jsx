/* eslint-disable @next/next/no-img-element */
import { iconsUrl } from "@/utils/urls";
import React from "react";
import styles from "./Warning.module.scss";

export default function WarningMessage({ errorMsg }) {
  return (
    <div className={styles.verificationContainer}>
      <img
        alt="icon danger"
        className={styles.image}
        src={`${iconsUrl}/general/danger.svg`}
      />
      <p className={styles.title}>{errorMsg && errorMsg}</p>
    </div>
  );
}
