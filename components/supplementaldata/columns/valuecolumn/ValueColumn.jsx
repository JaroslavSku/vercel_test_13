import React from "react";
import { isStringEmpty } from "../../../../utils/helper";
import translate from "../../../../utils/supplementalDataTable";
import styles from "./ValueColumn.module.scss";
import { find } from "lodash";
export default function ValueColumn({ data, id, edit }) {
  function renderValues() {
    switch (true) {
      case id === "birthday" && !isStringEmpty(data[id]):
        return new Date(data[id])?.toISOString()?.substr(0, 10) || "";
      case (id === "smoker" || id === "animals") && data[id] === 1:
        return "Ano";
      case (id === "smoker" || id === "animals") && data[id] === 0:
        return "Ne";
      case isStringEmpty(data[id]):
        return "Nevyplněno";
      default:
        const value = find(translate[id].options, (option) => {
          return option.value == data[id];
        });
        return value?.desc || data[id];
    }
  }
  return (
    <span
      style={{ display: edit ? "none" : "block" }}
      className={styles.secondColumn}
    >
      {renderValues()}
    </span>
  );
}
