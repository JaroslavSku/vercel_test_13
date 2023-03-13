import React from "react";
import Card from "./card/Card";
import styles from "./Cards.module.scss";

export default function Cards({ adverts }) {
  return (
    <div className={styles.body}>
      {adverts.map((advert) => {
        return <Card key={advert._id} advert={advert} />;
      })}
    </div>
  );
}
