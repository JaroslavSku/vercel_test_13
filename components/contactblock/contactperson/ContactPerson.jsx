import React from "react";
import styles from "./ContactPerson.module.scss";
import Image from "next/image";

export default function ContactPerson({ advert }) {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.imageContainer}>
          <Image
            alt="ubytovani"
            layout="fill"
            objectFit="cover"
            loading="lazy"
            src={`${process.env.NEXT_PUBLIC_REACT_BE_API}/${advert?.creator?.imageUrl}`}
            loader={() =>
              `${process.env.NEXT_PUBLIC_REACT_BE_API}/${advert?.creator?.imageUrl}`
            }
            onError={() => "icons/people/avatar-person.svg"}
          />
        </div>
        <div>
          <div className={styles.name}>{advert?.creator?.name}</div>
          <div className={styles.userTime}>
            Uživatelem od{" "}
            {new Date(advert?.creator?.createdAt || new Date()).getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
