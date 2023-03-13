import React from "react";
import styles from "./SwitchButton.module.scss";

export default function SwitchButton({ show, change, edit, formik, loading }) {
  function handleSubmitting() {
    formik.setFieldValue("allowSubmitting", false);
    edit();
  }

  function allowSubmitting() {
    formik.setFieldValue("allowSubmitting", true);
  }

  return (
    <div style={{ display: show ? "block" : "none" }}>
      {!change ? (
        <button
          onClick={() => handleSubmitting()}
          className={styles.submitButton}
          type="button"
        >
          Upravit
        </button>
      ) : (
        <button
          className={loading ? styles.buttonLoading : styles.submitButton}
          onClick={() => allowSubmitting()}
          type="submit"
        >
          Uložit
        </button>
      )}
    </div>
  );
}
