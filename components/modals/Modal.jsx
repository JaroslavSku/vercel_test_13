import React, { useEffect, useRef, useState } from "react";
import styles from "./Modal.module.scss";

export default function Modal({ show, children, close }) {
  const [modalClass, setClass] = useState(styles.hideModal);
  const mainRef = useRef(null);
  useEffect(() => {
    if (show) {
      setClass(styles.showModal);
    } else {
      setClass(styles.hideModal);
    }
  }, [show]);

  function handleClick({ target }) {
    if (mainRef && !mainRef.current.contains(target)) {
      close();
    }
  }
  return (
    <div className={modalClass} onClick={handleClick}>
      <div className={styles.container}>
        <div ref={mainRef} className={styles.main}>
          {children}
        </div>
      </div>
    </div>
  );
}
