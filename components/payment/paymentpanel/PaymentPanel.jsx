/* eslint-disable @next/next/no-img-element */
import React from "react";
import PaymentButton from "./paymentbutton/PaymentButton";
import styles from "./PaymentPanel.module.scss";
export default function PaymentPanel({ handlePay }) {
  return (
    <div className={styles.paymentPanel}>
      <h2 className={styles.titlePayments}>Vyberte způsob platby:</h2>
      <p className={styles.subtitlePayments}>Platba kartou</p>
      <div className={styles.paymentMethods}>
        <div className={styles.creditCardPayment}>
          <img
            alt="Platba kartou"
            className={styles.image}
            src="https://gate.gopay.cz/images/checkout/payment_card.png"
          />
        </div>
      </div>
      <PaymentButton handlePay={handlePay} />
    </div>
  );
}
