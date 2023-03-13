import React, { useEffect, useState } from "react";
import { map, take, filter } from "lodash";
import Advert from "../advert/Advert";
import styles from "./AdvertsCoverPage.module.scss";
import { useSelector } from "react-redux";
import EntryFooter from "../../tables/entryfooter/EntryFooter";
import LoginModal from "../../modals/loginmodal/LoginModal";
import axios from "axios";

export default function AdvertsCoverPage({ adverts }) {
  const [openModal, setOpenModal] = useState(false);
  const [index, setIndex] = useState(10);
  const [variableIndex, setVariableIndex] = useState(5);
  function showMore() {
    setIndex(index + variableIndex);
  }

  function handleLogin() {
    setOpenModal(true);
  }
  useEffect(() => {
    function onAdsResize() {
      const viewPortWidth = window.innerWidth;
      switch (true) {
        case viewPortWidth < 670:
          setVariableIndex(2);
          setIndex(4);
          break;

        case viewPortWidth < 730:
          setVariableIndex(2);
          setIndex(4);
          break;

        case viewPortWidth < 1020:
          setVariableIndex(3);
          setIndex(6);
          break;
        case viewPortWidth < 1350:
          setVariableIndex(4);
          setIndex(8);
          break;
        default:
          setVariableIndex(5);
          setIndex(10);
          break;
      }
    }
    ["load", "resize"].forEach((event) => {
      window.addEventListener(event, onAdsResize);
    });

    return () => {
      ["load", "resize"].forEach((event) => {
        window.removeEventListener(event, onAdsResize);
      });
    };
  }, []);

  return (
    <>
      {adverts.length > 0 && (
        <div className={styles.container}>
          <LoginModal close={() => setOpenModal(false)} show={openModal} />
          <h2 className={styles.title}>Zajímavé inzeráty</h2>
          <div className={styles.body}>
            {map(take(adverts, index), (advert) => {
              return (
                <div key={advert._id} className={styles.item}>
                  {advert && (
                    <Advert
                      slides={1}
                      advertData={advert}
                      handleLogin={handleLogin}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <EntryFooter showMore={showMore} />
        </div>
      )}
    </>
  );
}
