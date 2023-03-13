import React from "react";
import Slider from "../../../slider/Slider";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import styles from "./ContentColumn.module.scss";
import $c from "../../../../utils/currencyFormatter";

export default function ContentColumn({ description, rent, images }) {
  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        <Slider slides={images} />
      </div>
      <div className={styles.description}>
        <h5 className={styles.descriptionTitle}>
          <SpeakerNotesIcon /> Popis:
        </h5>
        {description}
      </div>
      <div className={styles.price}>
        <h5 className={styles.priceTitle}>
          <LocalOfferIcon />
          Cena za tento pronájem čítá:
        </h5>
        {$c(rent)}
      </div>
    </div>
  );
}
