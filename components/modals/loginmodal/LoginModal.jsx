import React from "react";
import Modal from "../Modal";
import styles from "./LoginModal.module.scss";
import Cross from "../inputs/close/Cross";
import { useRouter } from "next/router";

function LoginModal({ close, show, text }) {
  const router = useRouter();

  return (
    <Modal close={close} show={show}>
      <div className={styles.cross}>
        <Cross onClick={close} />
      </div>
      <div className={styles.container}>
        <p className={styles.heading}>{text}</p>
        <div className={styles.body}>
          <button
            className={styles.button}
            onClick={() => {
              router.push("/prihlaseni");
            }}
            type="submit"
            id="submit"
            name="submit"
          >
            Přihlásit se
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default LoginModal;
