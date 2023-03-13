import Link from "next/link";
import React from "react";
import {
  adminSideMenuLinks,
  najemnikSideMenuLinks,
  pronajimatelSideMenuLinks,
} from "../../../utils/links";
import LogoutLink from "../../sidemenu/logoutlink/LogoutLink";
import styles from "./ProfileMenu.module.scss";
import { useSelector } from "react-redux";

export default function ProfileMenu({ userType, show }) {
  const links = useSelector((state) =>
    state.auth.level === "admin"
      ? adminSideMenuLinks
      : state.auth.userType === "pronajimatel"
      ? pronajimatelSideMenuLinks
      : najemnikSideMenuLinks
  );
  return (
    <div
      className={styles.container}
      style={{ display: show === true ? "block" : "none" }}
    >
      <ul className={styles.list}>
        {links.map(({ href, name }) => {
          return (
            <li key={name} className={styles.listItem}>
              <Link href={href}>{name}</Link>
            </li>
          );
        })}
        <LogoutLink href="/logout" />
      </ul>
    </div>
  );
}
