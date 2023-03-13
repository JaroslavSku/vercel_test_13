/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./LogoutLink.module.scss";
import Link from "next/link";

export default function LogoutLink({ href }) {
  return (
    <li className={styles.logout}>
      <img
        className={styles.logoutImg}
        alt="logout"
        src="/icons/general/logout.svg"
      />
      <Link href={href}>Odhlásit se</Link>
    </li>
  );
}
