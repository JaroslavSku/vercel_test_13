/* eslint-disable @next/next/no-img-element */
import { iconsUrl } from "@/utils/urls";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import VerifyModal from "../modals/verifyidmodal/VerifyModal";
import styles from "./OwnerVerification.module.scss";

export default function OwnerVerification() {
  const [show, setShow] = useState(false);
  const verified = useSelector((state) => state.auth.verfied);
  function close() {
    setShow(false);
  }

  return (
    <div className={styles.body}>
      <div className={styles.ownership}>
        {verified ? (
          <img
            className={styles.checkmark}
            src={`${iconsUrl}/general/green-checkmark.svg`}
            alt="checked"
          />
        ) : (
          <img
            className={styles.checkmark}
            src={`${iconsUrl}/general/error.svg`}
            alt="checked"
          />
        )}
        Vlastnictví neověřeno
      </div>
      <VerifyModal show={show} close={close} />
      <button className={styles.button} onClick={() => setShow(true)}>
        Ověřit vlastnictví
      </button>
      <div className={styles.info}>
        <p>V případě, že vlastníte více než 6 nemovitostí</p>
        <p>napište nám na e-mail: petra.skudrnova@gmail.com.</p>
      </div>
    </div>
  );
}
