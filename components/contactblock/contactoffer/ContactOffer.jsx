import time_ago from "@/utils/timeAgo";
import React from "react";
import styles from "./ContactOffer.module.scss";

export default function ContactOffer({ onClick, advert }) {
  return (
    <div>
      <div className={styles.infoBody}>
        <div className={styles.offerBox}>
          <strong>Nabidka online</strong>
          <span className={styles.time}>
            {time_ago(new Date(advert?.createdAt || new Date()))}
          </span>
        </div>
        <div className={styles.adNumberBox}>
          <strong>Kód inzeratu</strong>
          <span className={styles.adNumber}>{advert?._id?.substr(-5)}</span>
        </div>
      </div>
      <button onClick={onClick} className={styles.contactBtn}>
        Poslat zprávu pronajímateli
      </button>
    </div>
  );
}
