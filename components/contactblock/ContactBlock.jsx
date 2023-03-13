import React from "react";
import styles from "./ContactBlock.module.scss";
import { addPersonAvatar } from "@/utils/addPersonAvatar";
import ContactPerson from "./contactperson/ContactPerson";
import ContactOffer from "./contactoffer/ContactOffer";

export default function ContactBlock({ advert, openContacts }) {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div>
          <p className={styles.titleContainer}>
            <strong>Kontaktní informace</strong>
          </p>
          <ContactPerson advert={advert} />
          <ContactOffer onClick={openContacts} advert={advert} />
        </div>
      </div>
    </div>
  );
}
