import React from "react";
import styles from "./AdvTitle.module.scss";

export default function AdvTitle({ adv }) {
  return (
    <h4 className={styles.title}>
      {`Pronájem ${adv?.layout || ""}, ${adv?.size || ""}`}m<sup>2</sup>,
      {adv?.rent?.toLocaleString() || ""}Kč
    </h4>
  );
}
