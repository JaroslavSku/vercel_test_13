import React from "react";
import styles from "./InfoMessageBox.module.scss";
function InfoMessageBox({ message, messageType }) {
  return (
    <div>
      {message && (
        <div
          className={
            messageType === "confirm"
              ? styles.confirmMessage
              : styles.errorMessage
          }
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default InfoMessageBox;
