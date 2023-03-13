import Link from "next/link";
import React, { useState } from "react";
import styles from "./BurgerMenu.module.scss";
import { burgerMenuLinks } from "../../utils/links";
import { map } from "lodash";

export default function BurgerMenu() {
  const [burgerMenuVisibility, setBurgerMenuVisitbility] = useState(false);
  return (
    <div onClick={() => setBurgerMenuVisitbility(!burgerMenuVisibility)}>
      <div
        style={{
          zIndex: burgerMenuVisibility ? "200" : "0",
        }}
        className={styles.burger}
      >
        <div />
        <div />
        <div />
      </div>
      <div
        style={{ display: burgerMenuVisibility ? "block" : "none" }}
        className={styles.overlay}
      />
      <nav
        style={{ display: burgerMenuVisibility ? "block" : "none" }}
        className={styles.navBar}
      >
        <ul
          style={{ display: burgerMenuVisibility ? "block" : "none" }}
          className={styles.list}
        >
          {map(burgerMenuLinks, ({ href, name }) => {
            return (
              <li className={styles.listItem}>
                <Link href={href}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
