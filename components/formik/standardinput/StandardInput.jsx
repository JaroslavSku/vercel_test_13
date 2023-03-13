import React from "react";
import styles from "./StandardInput.module.scss";

export default function StandardInput({
  id,
  name,
  type,
  placeholder,
  formik,
  label,
  backLabel,
  sup,
  groupWidth,
  maxWidth,
  minWidth,
  border,
  maxlength,
}) {
  const styleError = {
    border: "1px solid #e33e44",
  };
  const style = {
    border: border,
  };
  return (
    <div
      style={{ width: groupWidth, maxWidth: maxWidth, minWidth: minWidth }}
      className={styles.group}
    >
      {label && (
        <label className={styles.label} htmlFor="size">
          {label}
        </label>
      )}
      <div className={styles.inputBody}>
        <input
          id={id}
          name={name}
          type={type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.inputText}
          value={formik.values[name]}
          placeholder={placeholder}
          style={formik.errors[name] ? styleError : style}
          maxLength={maxlength}
        />
        <span className={styles.backLabel}>
          {backLabel}
          <sup>{sup}</sup>
        </span>
      </div>
    </div>
  );
}
