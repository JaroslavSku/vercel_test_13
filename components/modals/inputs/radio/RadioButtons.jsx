import { Field, FormikProvider } from "formik";
import React from "react";
import { styleError } from "../../../../utils/someStyles";
import styles from "./RadioButtons.module.scss";

export default function RadioButtons({
  title,
  labels,
  formik,
  name,
  labelInput,
}) {
  if (labelInput) {
    return (
      <div role="group" className={styles.standardContainer}>
        <span className={styles.blockTitle}>{title}</span>
        {labelInput.map(({ desc, value }) => {
          return (
            <FormikProvider key={desc} value={formik}>
              <div className={styles.group}>
                <label className={styles.label} htmlFor={name}>
                  <Field
                    name={name}
                    type="radio"
                    style={formik.errors[name] ? styleError : null}
                    value={value}
                  />
                  {desc}
                </label>
              </div>
            </FormikProvider>
          );
        })}
      </div>
    );
  } else {
    return (
      <div role="group" className={styles.subgrid}>
        <span className={styles.title}>{title}</span>
        {labels.map((labelName, index) => {
          return (
            <FormikProvider key={index} value={formik}>
              <div className={styles.group}>
                <label className={styles.label} htmlFor={labelName}>
                  <Field
                    name={name}
                    type="radio"
                    style={formik.errors[name] ? styleError : null}
                    value={labelName}
                  />
                  {labelName}
                </label>
              </div>
            </FormikProvider>
          );
        })}
      </div>
    );
  }
}
