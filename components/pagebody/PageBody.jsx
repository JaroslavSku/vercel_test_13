import React, { useState } from "react";
import styles from "./PageBody.module.scss";
import MyFavorites from "../myfavorites/MyFavorites";
import Cards from "../cards/Cards";
import InfoBox from "./infobox/InfoBox";
import LoginModal from "../modals/loginmodal/LoginModal";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function PageBody({ adverts }) {
  const likesAds = useSelector((state) => state.auth.likesAds);
  const [openModal, setOpenModal] = useState(false);

  const { token = null } = useSelector((state) => state.auth);
  function handleSave() {
    if (!token) {
      setOpenModal(true);
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.favorites}>
        <LoginModal
          text="Pro uložení oblíbených se prosím přihlaste."
          close={() => setOpenModal(false)}
          show={openModal}
        />
        <div className={styles.favoritesBody}>
          <MyFavorites onSave={handleSave} />
          <div className={styles.body}>
            <div className={styles.imageContainer}>
              <Image
                alt="house picture"
                layout="fill"
                objectFit="cover"
                loading="lazy"
                src="images/house.avif"
                loader={() => "images/house.avif"}
              />
            </div>

            <h3 className={styles.imageTitle}>
              Potřebujete nájemní smlouvu? Chcete poradit? Najděte svého
              <strong> Nájemníka v pohodě.</strong>
            </h3>
            <Image
              alt="logo najmenik vpohode"
              className={styles.logo}
              objectFit="cover"
              loading="lazy"
              width="600"
              height="400"
              src="icons/general/logo.svg"
              loader={() => "icons/general/logo.svg"}
            />
          </div>
        </div>
      </div>

      <div>
        <InfoBox />
        <Cards adverts={adverts} />
      </div>
    </div>
  );
}
