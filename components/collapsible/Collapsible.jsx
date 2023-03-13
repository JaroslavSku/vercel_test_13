import React from "react";
import { advertDate } from "../../utils/advertDate";
import { houseEquipment } from "../../utils/houseEquipment";
import StandardInput from "../formik/standardinput/StandardInput";
import CheckBoxGroup from "../modals/inputs/checkgroup/CheckBoxGroup";
import RadioButtons from "../modals/inputs/radio/RadioButtons";
import styles from "./Collapsible.module.scss";

export default function Collapsible({ show, formik }) {
  return (
    <div className={show ? styles.containerShow : styles.containerHide}>
      <div className={styles.line}>
        <StandardInput
          type="number"
          name="priceFrom"
          id="priceFrom"
          label="Cena od:"
          formik={formik}
          groupWidth="45%"
        />
        <StandardInput
          label="Velikost od: "
          backLabel="m"
          sup="2"
          formik={formik}
          type="number"
          name="sizeFrom"
          id="sizeFrom"
          groupWidth="45%"
        />
      </div>
      <div className={styles.bottomLine}>
        <CheckBoxGroup
          labels={houseEquipment}
          name="equipment"
          title="Vybavení"
          formik={formik}
          displayBlock
        />
        <RadioButtons
          formik={formik}
          title="Stáří inzerátu"
          name="dateLimit"
          labelInput={advertDate}
        />
      </div>
    </div>
  );
}
