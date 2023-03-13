import React from "react";
import styles from "./ErrorMessage.module.scss";

export default function ErrorMessageFormik({ formik, name }) {
  return (
    <div>
      {formik.touched[name] && formik.errors[name] ? (
        <div className={styles.errorText}>{formik.errors[name]}</div>
      ) : null}
    </div>
  );
}
