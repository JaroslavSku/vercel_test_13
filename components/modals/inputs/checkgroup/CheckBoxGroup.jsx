import { Field, FormikProvider } from "formik";
import React from "react";
import styles from "./CheckBoxGroup.module.scss";
import { styleError } from "../../../../utils/someStyles";
import { map } from "lodash";
export default function CheckBoxGroup({
  labels,
  name,
  title,
  formik,
  displayBlock,
}) {
  return (
    <div>
      <div
        role="group"
        className={styles.subgrid}
        aria-labelledby="checkbox-group"
        style={{ display: displayBlock ? "block" : "grid" }}
      >
        <label className={styles.title}>{title}</label>
        {map(labels, ({ desc, value }) => {
          return (
            <FormikProvider value={formik}>
              <div className={styles.group}>
                <label className={styles.label} htmlFor={name}>
                  <Field
                    type="checkbox"
                    name={name}
                    value={value}
                    style={
                      formik.touched.idCard && formik.errors[name]
                        ? styleError
                        : null
                    }
                  />
                  {desc}
                </label>
              </div>
            </FormikProvider>
          );
        })}
      </div>
    </div>
  );
}
