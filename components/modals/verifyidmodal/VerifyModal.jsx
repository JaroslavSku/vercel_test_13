/* eslint-disable @next/next/no-img-element */
import { iconsUrl } from "@/utils/urls";
import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { uploadPicture } from "../../../redux/actions/userActions";
import Cross from "../inputs/close/Cross";
import Modal from "../Modal";
import styles from "./Verify.module.scss";

function VerifyModal({ close, show }) {
  const [idImage, setImage] = useState(null);
  function onClickSend() {
    const formData = new FormData();
    formData.append("image", idImage);
    // uploadPicture(formData);
    const email = "jaroslavskudrna@gmail.com";
    formData.append("image", email);
    console.log(formData, Object.fromEntries(formData));
    axios
      .post(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/email-room/verifyUser`,
        formData
      )
      .then(({ data }) => {
        console.log(data);
        //    dispatch(setConfirmationMessage(data));
      })
      .catch(({ response }) => {
        const data = response?.data;
        //   dispatch(setErrorMessage(data));
      });
  }

  function handleChange(e) {
    if (e.target.files.length) {
      setImage(e.target.files[0]);
    }
  }
  return (
    <Modal show={show} close={close}>
      <div className={styles.cross}>
        <Cross onClick={close} />
      </div>
      <div className={styles.body}>
        <h5 className={styles.title}>Ověření totožnosti</h5>
        <p className={styles.description}>
          <img
            alt="icon document"
            src={`${iconsUrl}/general/credit-card.svg`}
          />
          Nahrání dokladu totožnosti a listu vlastnictví
        </p>
        <p className={styles.questions}>
          Při nahrání dokladu prosím začerněte / jinak zneviditelněte Vaše
          citlivé údaje: datum narození, rodné číslo a podpis.
        </p>
        <p className={styles.questions}>
          Fotka dokladu slouží pouze k ověření a po ověření bude automaticky
          smazána.
        </p>

        <label htmlFor="id-upload" className={styles.label}>
          <span className={styles.uploadBtn}>Nahrát soubor</span>
          <input
            id="id-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleChange}
          />
        </label>
        <div className={styles.imageContainer}>
          {idImage && (
            <img
              className={styles.verifyImage}
              alt="id image"
              src={URL.createObjectURL(idImage)}
            />
          )}
        </div>
        <div className={styles.buttons}>
          <button
            onClick={() => onClickSend()}
            className={styles.submitBtn}
            id="submit"
            type="submit"
          >
            Odeslat
          </button>
          <button
            onClick={close}
            className={styles.cancelBtn}
            id="cancel"
            type="cancel"
          >
            Zrušit
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default connect((state) => state, { uploadPicture })(VerifyModal);
