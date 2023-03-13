import React from "react";
import styles from "./TermsAndConditions.module.scss";
function TermsAndConditions({ name, formik, labelName }) {
  const styleError = {
    border: "1px solid #e33e44",
  };
  return (
    <div className={styles.container}>
      <input
        id={name}
        name={name}
        type="checkbox"
        className={styles.input}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        checked={formik.values[name]}
        style={formik.errors[name] ? styleError : null}
      />
      <label className={styles.label} htmlFor="conditions">
        <a
          className={styles.link}
          href="/resources/pdf/TermsAndConditions.pdf"
          target="_blank"
        >
          {labelName}
        </a>
      </label>
    </div>
  );
}

export default TermsAndConditions;
