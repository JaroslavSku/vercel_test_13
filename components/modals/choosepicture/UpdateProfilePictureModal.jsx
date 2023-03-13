import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { uploadPicture } from "../../../redux/actions/userActions";
import Modal from "../Modal";
import EditPickmodal from "../croppicturemodal/EditPickmodal";
import styles from "./UpdateProfilePictureModal.module.scss";

function UpdateProfilePictureModal({ show, close }) {
  const [image, setImage] = useState(null);
  const [reactAvatarShow, setReactAvatarShow] = useState(false);
  function handleChange(e) {
    if (e.target.files.length) {
      setImage(e.target.files[0]);
      setReactAvatarShow(true);
    }
  }

  function reactAvatarHide() {
    setReactAvatarShow(false);
    setImage(null);
  }
  return (
    <Modal show={show} close={close}>
      <div className={styles.modalBody}>
        <EditPickmodal
          show={reactAvatarShow}
          image={image}
          close={reactAvatarHide}
        />
        <h4 className={styles.title}>Změnit profilovou fotku</h4>
        <label htmlFor="upload-button" className={styles.item}>
          Nahrát fotku
          <input
            id="upload-button"
            type="file"
            style={{ display: "none" }}
            onChange={handleChange}
          />
        </label>
        <div onClick={close} className={styles.cancel}>
          Zrušit
        </div>
      </div>
    </Modal>
  );
}

export default connect((state) => state, { uploadPicture })(
  UpdateProfilePictureModal
);
