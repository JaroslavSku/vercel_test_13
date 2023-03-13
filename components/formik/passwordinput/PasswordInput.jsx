/* eslint-disable @next/next/no-img-element */
import { iconsUrl } from "@/utils/urls";
import React, { useRef, useState } from "react";
import styles from "./PasswordInput.module.scss";

export default function PasswordInput({ formik, name, label }) {
  const [visible, setVisible] = useState(false);
  const passwordImg = useRef(null);
  return (
    <div className={styles.passwordInputContainer}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={visible ? "text" : "password"}
        className={styles.passwordInpt}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
      />
      <img
        onClick={() => {
          setVisible(!visible);
        }}
        className={styles.eyeImage}
        alt="eye image"
        ref={passwordImg}
        src={`${iconsUrl}/general/eye-close-up.svg`}
      />
    </div>
  );
}
