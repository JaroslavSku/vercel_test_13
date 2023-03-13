import React from "react";
import styles from "./PaymentButton.module.scss";
export default function PaymentButton({ handlePay }) {
  return (
    <button onClick={handlePay} className={styles.button}>
      Provést platbu
    </button>
  );
}
