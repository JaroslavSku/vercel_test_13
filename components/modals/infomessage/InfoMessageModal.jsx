import React from "react";
import Message from "../../message/Message";
import Cross from "../inputs/close/Cross";
import Modal from "../Modal";
import styles from "./InfoMessageModal.module.scss";

function InfoMessageModal({ message, show, close }) {
  return (
    <Modal show={show} close={close}>
      <div className={styles.body}>
        <div className={styles.cross}>
          <Cross onClick={close} />
        </div>
        <Message title={message} show={show} />
      </div>
    </Modal>
  );
}

export default InfoMessageModal;
