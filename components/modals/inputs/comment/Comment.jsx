import React from "react";
import styles from "./Comment.module.scss";

export default function Comment({ formik, value, title, styleError }) {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="comment">
        {title}
      </label>
      <input
        id="comment"
        name="comment"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={value}
        maxLength="60"
        className={styles.inputText}
        style={formik.errors.comment ? styleError : null}
      />
    </div>
  );
}
