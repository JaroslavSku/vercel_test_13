import React from "react";
import styles from "./DateInput.module.scss";

export default function DateInput({
  formik,
  name,
  title,
  value,
  groupWidth,
  maxWidth,
  minWidth,
  inputWidth,
}) {
  let date = new Date();
  const styleError = {
    border: "1px solid #e33e44",
  };
  let formatedDate = ` ${date.getDate()}.${
    date.getMonth() + 1
  }.${date.getFullYear()}`;
  return (
    <div
      style={{ width: groupWidth, maxWidth: maxWidth, minWidth: minWidth }}
      className={styles.container}
    >
      <label className={styles.label} htmlFor="email">
        {title}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        onFocus={(e) => {
          e.currentTarget.type = "date";
        }}
        onChange={formik.handleChange}
        onBlur={(e) => {
          e.currentTarget.type = "text";
        }}
        value={value}
        placeholder={formatedDate}
        defaultValue={formatedDate}
        className={styles.datePicker}
        style={(formik.errors[name] ? styleError : null, { width: inputWidth })}
      />
    </div>
  );
}
