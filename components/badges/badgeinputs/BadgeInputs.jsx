import { Field, Formik } from "formik";
import React from "react";
import FormikOnChange from "../../formik/formikeffect/FormikOnChange";
import styles from "./BadgeInputs.module.scss";
import { map } from "lodash";

function BadgeInputs({ fields, data, badgeRef, onChange }) {
  console.log("badgetypes", data?.badgeType);
  return (
    <div ref={badgeRef}>
      <Formik
        enableReinitialize
        initialValues={{
          badgeType: data?.badgeType || "",
          id: data?._id || "",
        }}
      >
        {(_) => (
          <>
            <FormikOnChange onChange={onChange} />
            <form className={styles.form}>
              {map(fields, ({ value, desc }) => {
                return (
                  <div className={styles.radioField}>
                    <Field name="badgeType" type="radio" value={value} />
                    <label htmlFor="badgeType">{desc}</label>
                  </div>
                );
              })}
            </form>
          </>
        )}
      </Formik>
    </div>
  );
}

export default BadgeInputs;
