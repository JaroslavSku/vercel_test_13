import React from "react";
import Cross from "../close/Cross";
import styles from "./ModalHeader.module.scss";

export default function ModalHeader({ title, onClick, formik, styleError }) {
  return (
    <div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <Cross onClick={onClick} />
      </div>
      <hr className={styles.line} />
      <div className={styles.nameInputs}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Jméno"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={formik.errors.name ? styleError : null}
        />
        <input
          type="text"
          name="surname"
          id="surname"
          placeholder="Přijmení"
          value={formik.values.surname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={formik.errors.surname ? styleError : null}
        />
        <input
          type="text"
          name="birthId"
          id="birthId"
          placeholder="Rodné číslo"
          value={formik.values.birthId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={formik.errors.birthId ? styleError : null}
        />
        <input
          type="text"
          name="idCard"
          id="idCard"
          placeholder="Číslo OP"
          value={formik.values.idCard}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={formik.errors.idCard ? styleError : null}
        />
      </div>
    </div>
  );
}
