import React from "react";
import styles from "./AdresaInput.module.scss";

export default function AdresaInput({ formik, title, value, styleError }) {
  return (
    <div>
      <label className={styles.label} htmlFor="address">
        {title}
      </label>
      <input
        id="address"
        name="address"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={styles.inputText}
        value={value}
        style={
          formik.touched.address && formik.errors.address ? styleError : null
        }
      />
    </div>
  );
}
