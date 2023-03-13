import React from "react";
import styles from "./RedCircle.module.scss";
export default function RedCircle({ data }) {
  const paidDate = data?.paidDate ? new Date(data.paidDate) : new Date();
  const today = new Date();
  const remainingTime =
    (today.getTime() - paidDate.getTime()) / (3600 * 24 * 1000);
  return (
    <div>
      {remainingTime > 30 || remainingTime === 0 ? (
        <div className={styles.redCircle}>Zveřejněte inzerát</div>
      ) : null}
    </div>
  );
}
