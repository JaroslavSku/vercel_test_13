/* eslint-disable @next/next/no-img-element */
import { iconsUrl } from "@/utils/urls";
import React, { useState } from "react";
import styles from "./RegistrationSignpostBtn.module.scss";

export default function RegistrationSignpostBtn({
  image,
  title,
  userType,
  formik,
  onClick,
  checked,
}) {
  return (
    <div
      onClick={() => formik.setFieldValue("userType", userType)}
      className={styles.button}
    >
      <label className={styles.userBtnLabel}>
        <img
          className={styles.tenantImage}
          alt="owner"
          src={`${iconsUrl}/general/${image}`}
        />

        <span className={styles.radioBtnContainer}>
          <span className={styles.title}>{title}</span>
          <input
            type="radio"
            name="usertype"
            value={userType}
            onClick={onClick}
            checked={checked}
          />
          <span className={styles.square}>
            <img
              alt="square"
              className={styles.checkedImage}
              src={`${iconsUrl}/general/check.svg`}
            />
          </span>
        </span>
      </label>
    </div>
  );
}
