import React from "react";
import styles from "./CustomInput.module.scss";

export default function CustomInput({
  type,
  options,
  name,
  edit,
  formik,
  label,
  maxWidth,
  minWidth,
  containerWidth,
  selectWidth,
  customBorder,
  selectAppearence,
}) {
  const styleError = {
    border: "1px solid #e33e44",
    width: selectWidth,
    appearance: selectAppearence,
  };

  const style = {
    border: customBorder,
    width: selectWidth,
    appearance: selectAppearence,
  };

  return (
    <div
      className={styles.container}
      style={{
        display: edit ? "block" : "none",
        maxWidth: maxWidth,
        minWidth: minWidth,
        width: containerWidth,
      }}
    >
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <div className={styles.inputBody}>
        {type === "select" ? (
          <select
            name={name}
            id={name}
            onChange={formik.handleChange}
            style={formik.errors[name] ? styleError : style}
          >
            {options.map(({ desc, value }) => {
              return (
                <option
                  key={value}
                  selected={formik.values[name] === value ? true : false}
                  value={value}
                >
                  {desc}
                </option>
              );
            })}
          </select>
        ) : (
          <input
            type={type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[name]}
            style={formik.errors[name] ? styleError : null}
            name={name}
            min="1"
          />
        )}
      </div>
    </div>
  );
}
