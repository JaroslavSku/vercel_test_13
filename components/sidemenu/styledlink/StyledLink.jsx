/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import styles from "./StyledLink.module.scss";
import Link from "next/link";
import { iconsUrl } from "@/utils/urls";

export default function StyledLink({ href, children }) {
  const router = useRouter();
  let active = false;
  if (router.pathname === href) {
    active = true;
  }
  return (
    <li className={active ? styles.active : styles.passive}>
      <Link href={href}>{children}</Link>
      <img
        className={styles.arrow}
        src={`${iconsUrl}/general/right-arrow.svg`}
        alt="pencil"
      />
    </li>
  );
}
