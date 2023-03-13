import React from "react";
import { styleError } from "../../../utils/someStyles";
import styles from "./TextArea.module.scss";
export default function TextArea({ formik, name, id, label }) {
  return (
    <textarea
      name={name}
      id={id}
      placeholder={label}
      className={styles.textarea}
      rows="10"
      value={formik.values[name]}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      style={formik.errors[name] ? styleError : null}
    ></textarea>
  );
}
