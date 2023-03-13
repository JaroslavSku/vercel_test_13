import React, { useState } from "react";
import { map, take } from "lodash";
import Advert from "../advert/Advert";
import styles from "./SearchPanelAdverts.module.scss";
import EntryFooter from "../../tables/entryfooter/EntryFooter";
import LoginModal from "../../modals/loginmodal/LoginModal";

export default function SearchPanelAdverts({ adverts, slides }) {
  const [openModal, setOpenModal] = useState(false);
  const [addCount, setAddCount] = useState(8);
  function handleLogin() {
    setOpenModal(true);
  }

  function handleShowMore() {
    setAddCount(addCount + 4);
  }

  return (
    <div className={styles.container}>
      <LoginModal close={() => setOpenModal(false)} show={openModal} />
      {map(take(adverts, addCount), (advert) => {
        return (
          <Advert
            slides={slides}
            advertData={advert}
            handleLogin={handleLogin}
          />
        );
      })}
      <EntryFooter showMore={handleShowMore} />
    </div>
  );
}
