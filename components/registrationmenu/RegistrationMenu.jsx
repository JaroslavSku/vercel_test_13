import React, { useState } from "react";
import styles from "./RegistrationMenu.module.scss";
import RegistrationSignpostBtn from "./registrationsignpostbutton/RegistrationSignpostBtn";

export default function RegistrationMenu({ formik }) {
  const [checked, setChecked] = useState(false);
  return (
    <div className={styles.container}>
      <RegistrationSignpostBtn
        formik={formik}
        title="Pronajímatel"
        image="house.svg"
        userType="pronajimatel"
        onClick={() => {}}
        checked={!checked}
      />
    </div>
  );
}
