import React from "react";
import { connect } from "react-redux";
import { deleteHouse } from "../../../redux/actions/propertyActions";
import Modal from "../Modal";
import styles from "./ConfirmationModal.module.scss";

function ConfirmationModal({ show, close, handleConfirm, title }) {
  return (
    <Modal show={show} close={close}>
      <div className={styles.container}>
        <p className={styles.heading}>{title}</p>
        <div className={styles.body}>
          <button
            className={styles.button}
            onClick={() => {
              handleConfirm(), close();
            }}
            type="submit"
            id="submit"
            name="submit"
          >
            ANO
          </button>
          <button
            className={styles.button}
            onClick={close}
            type="reset"
            id="reset"
            name="reset"
          >
            NE
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default connect((state) => state, { deleteHouse })(ConfirmationModal);
