/* eslint-disable @next/next/no-img-element */
import React from "react";
import { baseUrlIcons } from "../../../../utils/constants";
import styles from "./OrderEntry.module.scss";

export default function OrderEntry({ date, title, amount, paid, token, id }) {
  return (
    <tr className={styles.line}>
      <td className={styles.date}>
        {date ? new Date(new Date(date)).toLocaleDateString() : ""}
      </td>
      <td className={styles.order}>{title}</td>
      <td className={styles.amount}>{amount} Kč</td>
      <td className={styles.payment}>
        {paid ? (
          <span className={styles.paid}>Uhrazeno</span>
        ) : (
          <span className={styles.unpaid}>Neuhrazeno</span>
        )}
      </td>
      <td>
        {!paid ? (
          <button type="submit" className={styles.paymentBtn}>
            Zaplatit Online
          </button>
        ) : null}
      </td>
      <td className={styles.pdf}>
        {paid ? (
          <a
            className={styles.button}
            download
            href={`${process.env.NEXT_PUBLIC_REACT_BE_API}/invoices/send-stream?orderId=${id}&token=${token}`}
            target="_blank"
            rel="nonreferer noreferrer"
          >
            <img
              className={styles.pdfImage}
              src={`${baseUrlIcons}/pdf.svg`}
              alt="platba"
            />
          </a>
        ) : null}
      </td>
    </tr>
  );
}
