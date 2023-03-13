import { useFormik } from "formik";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import ErrorMessageFormik from "../../formik/errormessage/ErrorMessageFormik";
import styles from "./BasicInformation.module.scss";
import * as Yup from "yup";
import { connect, useSelector } from "react-redux";
import { updateUserInfo } from "../../../redux/actions/userActions";

function BasicInformation({ updateUserInfo }) {
  const userData = useSelector((state) => state.auth.userData);
  const schema = Yup.object({
    name: Yup.string().trim().required("Prosím zadejte jméno."),
    surname: Yup.string().required("Prosím zadejte přijmení.").trim(),
    titleBefore: Yup.string().trim(),
    titleAfter: Yup.string().trim(),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      titleBefore: userData?.titleBefore || "",
      name: userData?.firstName || "",
      surname: userData?.surname || "",
      titleAfter: userData?.titleAfter || "",
      phone: userData?.phone?.toString() || "",
      email: userData?.email || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const trimmed = schema.cast(values);
      console.log("trimmed", trimmed);
      updateUserInfo(values);
    },
  });
  return (
    <div>
      <h3>Nastavení účtu</h3>
      <form className={styles.body} onSubmit={formik.handleSubmit}>
        <div className={styles.namesLine}>
          <input
            className={styles.titleBefore}
            placeholder="Titul před"
            id="titleBefore"
            name="titleBefore"
            type="text"
            value={formik.values.titleBefore}
            onChange={formik.handleChange}
          />
          <input
            className={styles.name}
            placeholder="Jméno"
            id="name"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <input
            className={styles.surname}
            placeholder="Přijmení"
            id="surname"
            name="surname"
            type="text"
            value={formik.values.surname}
            onChange={formik.handleChange}
          />
          <input
            className={styles.titleAfter}
            placeholder="Titul za"
            id="titleAfter"
            name="titleAfter"
            type="text"
            value={formik.values.titleAfter}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          {(formik.touched["name"] && formik.errors["name"]) ||
          (formik.touched["surname"] && formik.errors["surname"]) ? (
            <div className={styles.errorText}>
              Prosím doplňte jméno a přijmení.
            </div>
          ) : null}
        </div>
        <div className={styles.addInfo}>
          <PhoneInput
            country={"us"}
            value={formik.values.phone}
            onChange={(phone) => formik.setFieldValue("phone", phone)}
          />
          <ErrorMessageFormik name="phone" formik={formik} />
          <input
            className={styles.email}
            placeholder="Email"
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            disabled
          />
        </div>
        <div className={styles.buttons}>
          <button className={styles.submitBtn} id="submit" type="submit">
            Uložit
          </button>
          <button className={styles.cancelBtn} id="cancel" type="cancel">
            Zrušit
          </button>
        </div>
      </form>
    </div>
  );
}

export default connect((state) => state, { updateUserInfo })(BasicInformation);
