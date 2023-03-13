import React from "react";
import styles from "./BreadCrumbs.module.scss";

export default function BreadCrumbs({ layout, size }) {
  return (
    <div className={styles.content}>
      <ul className={styles.list}>
        <li>
          <a href={"/"}>Domů</a>
        </li>
        <li>
          <a href={"/mapa"}>Vyhledávání</a>
        </li>
        <li>
          Pronájem • {layout} • {size} m<sup>2</sup>
        </li>
      </ul>
    </div>
  );
}
